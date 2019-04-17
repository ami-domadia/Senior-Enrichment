const express = require('express')
const approute = express.Router()

const {Student, Campus} = require('./db.js')

approute.get('/api/students/', (req, res, next)=>{
    if(req.params.id){
        return Student.findOne({where: {id: req.params.id}})
        .then((student)=>res.json(student))
        .catch(next);
    }
    return Student.findAll({order: [['id', 'ASC']]})
    .then((students)=>res.json(students))
    .catch(next);
})

approute.get('/api/campuses/', (req, res, next)=>{
    if(req.params.id){
        return Campus.findOne({where: {id: req.params.id}})
        .then((campus)=>res.json(campus))
        .catch(next);
    }
    return Campus.findAll({order: [['id', 'ASC']]})
    .then((campuses)=>res.json(campuses))
    .catch(next);
})

approute.post('/api/campuses/', (req, res, next)=>{
    console.log('about to post campus:', req.body)
    return Campus.create(req.body)
    .then((campus)=>res.json(campus))
    .catch(next);
})

approute.post('/api/students/', (req, res, next)=>{
    return Promise.all([Student.create(req.body), Campus.findAll()])
    .then(([student, campuses])=>{res.json(student); return [student, campuses];})
    .then(([student, campuses])=>{return {student, campus: campuses.filter(item=>item.name.toLowerCase().includes(student.email.split('@')[1].split('.')[0]))[0]}})
    .then(({student, campus})=>{student.update({campusId: campus.id})})
    .catch(next);
})

approute.put('/api/students/:id', (req, res, next)=>{
    return Promise.all([Student.update(req.body, {returning: true, where: {id: req.params.id}}), Campus.findAll()])
    .then(([[ rowsUpdate, [updatedStudent] ], campuses])=>{console.log('student in put route after db update',updatedStudent); res.json(updatedStudent); return [updatedStudent, campuses];})
    .then(([student, campuses])=>{return {student, campus: campuses.filter(item=>item.name.toLowerCase().includes(student.email.split('@')[1].split('.')[0]))[0]}})
    .then(({student, campus})=>{Student.update({campusId: campus.id}, {returning: true, where: {id: student.id}}).then(([rowsUpdate, [updatedStudent]])=>updatedStudent)})
    .then(updatedStudent=>console.log('after campus update', updatedStudent))
    .catch(next);
})

approute.put('/api/campuses/:id', (req, res, next)=>{
    return Campus.update(req.body, {returning: true, where: {id: req.params.id}})
    .then(([ rowsUpdate, [updatedCampus] ])=>{console.log('student in put route after db update',updatedCampus); res.json(updatedCampus); return updatedCampus;})
    .then(updatedCampus=>console.log('after campus update', updatedCampus))
    .catch(next);
})

approute.delete('/api/campuses/:id', (req, res, next)=>{
    return Campus.destroy({where: {id: req.params.id}})
    .then(()=>res.send(204))
    .catch(next);
})

approute.delete('/api/students/:id', (req, res, next)=>{
    return Student.destroy({where: {id: req.params.id}})
    .then(()=>res.send(204))
    .catch(next);
})

module.exports = approute;
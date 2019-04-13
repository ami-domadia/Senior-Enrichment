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
    return Campus.create(req.body)
    .then((campus)=>res.json(campus))
    .catch(next);
})

approute.post('/api/students/', (req, res, next)=>{
    return Student.create(req.body)
    .then((student)=>res.json(student))
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
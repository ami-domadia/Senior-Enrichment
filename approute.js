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



// approute.post('/api/users', (req, res, next)=>{
//     console.log('req.body in router post', req.body)
//     return User.create(req.body)
//     .then(user => res.json(user))
//     .catch(next)
// })

// approute.put('/api/users/:id', (req, res, next)=>{
//     console.log(req.body)
//     return User.update(req.body, {where: {id: req.params.id}})
//     .then(user => res.json(user))
//     .catch(next)
// })

// approute.delete('/api/users/:id', (req, res, next)=>{
//     console.log(req.body)
//     return User.destroy({where: {id: req.params.id}})
//     .then(() => res.sendStatus(204).end())
//     .catch(next)
// })

module.exports = approute;
const { validationResult } = require('express-validator');
const { fork } = require('child_process')
const createError = require('http-errors')

const todo_model = require('../model/todo_model')

module.exports.create = (req, resp, next) => {
        try {
                 // Finds the validation errors in this request and wraps them in an object with handy functions
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        resp.status(422).json({errors: errors.array()});
                } else {

                        const newtodo = {
                                title: req.body.title,
                                completed: false
                        }
                
                        todo_model.todo(newtodo).save((err, data) => {
                                if (err) next(createError(422, err))
                                resp.status(200).json(data)
                        })
                }
        } catch (error) {
                next(createError(422, error))
        }
}

module.exports.fetch_todo = (req, resp, next) => {
        try {
                todo_model.todo.find({}, (err, data) => {
                        if (err) next(createError(422, err)) 
                        resp.status(200).json(data)
                })                
        } catch (error) {
                next(createError(422, error))
        }
}



module.exports.delete_todo = (req, resp, next) => {
        try {
                todo_model.todo.findByIdAndDelete({_id: req.params.id}, (err, data) => {
                        if (err) {
                                next(createError(422, err))
                        } else {
                                resp.status(200).json(data)
                        }
                })

        } catch(error) {
                next(createError(422, error))
        }
        
}


module.exports.update_todo = (req, resp, next) => {
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        resp.status(422).json({errors: errors.array()});
                } else {
                        const update = {
                                title: req.body.title,
                                completed: req.body.completed
                        }
        
                        todo_model.todo.findByIdAndUpdate({_id: req.body.id}, update, {new: true}, (err, data)=> {
                                if (err) next(createError(422, err))
                                resp.status(200).json(data)
                        })
                }
        } catch (error) {
                next(createError(422, error))
        }
}
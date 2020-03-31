const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: String,
    title: String,
    completed: Boolean    
})

module.exports.todo = mongoose.model("todo", todoSchema)

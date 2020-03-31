const router = require('express').Router()
const { check } = require('express-validator');

const todo_actions = require('../controllers/user_actions')

// ADD NEW TODO
router.post('/todo',  [
  // TODO TITLE MUST BE A STRING AND NOT BE EMPTY
  check('title').isString().notEmpty()
],  todo_actions.create)

// UPDATE EXISTING TODO
router.put('/todo',  [
  // TODO TITLE MUST BE A STRING AND NOT BE EMPTY
  check('title').isString().notEmpty(),
  check('completed').isBoolean(),
  check('id').isMongoId()
],  todo_actions.update_todo)

// FECTH TODOS
router.get('/todo', todo_actions.fetch_todo)

// DELETE TODO
router.delete('/todo/:id', todo_actions.delete_todo)


module.exports = router
const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');
const requiresAuth = require('../middleware/permissions');
const validateToDoInput = require('../validation/toDoValidation');

// @route   GET /api/todos/test
// @desc    Test the todos route
// @accesss Public
router.get('/test', (req, res) => {
  res.send("ToDo's route working");
});

// @route   POST /api/todos/new
// @desc    Create a new todo
// @accesss Private
router.post('/new', requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateToDoInput(req.body);
    if (!isValid) return res.status(400).json(errors)
    // create a new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    // save the new todo to db
    await newToDo.save();

    return res.json(newToDo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

// @route   GET /api/todos/current
// @desc    Current users todos
// @accesss Private
router.get('/current', requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    const incompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });

    return res.json({ incomplete: incompleteToDos, complete: completeToDos });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;

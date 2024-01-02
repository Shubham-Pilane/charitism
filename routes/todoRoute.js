const express = require('express');
const {Todo} = require('../models/todoModel');
const {auth} = require('../middleware/authentication');
const todoRoute = new express.Router();

// Create a new TODO
todoRoute.post('/addtodo', auth, async (req, res) => {
    const todo = new Todo({
        ...req.body,
        user: req.user._id
    });

    try {
        await todo.save();
        res.status(201).send("Todo added Sucessfully!!");
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all TODOs
todoRoute.get('/', auth, async (req, res) => {
    try {
        await req.user.populate('todos');
        res.send(req.user.todos);
    } catch (e) {
        res.status(500).send();
    }
});

// Update a TODO
todoRoute.patch('/update/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['text', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id});

        if (!todo) {
            return res.status(404).send();
        }

        updates.forEach((update) => todo[update] = req.body[update]);
        await todo.save();
        res.send(todo);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete a TODO
todoRoute.delete('/delete/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!todo) {
            res.status(404).send();
        }

        res.send(todo);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = {todoRoute};

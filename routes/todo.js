const express = require('express');
const router = express.Router();
const Todo = require('../model/addTodo')

router.get('/', (req, res) => {
    res.render('todo/index')
})

router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    try{
        const newTodo = await todo.save()
        res.redirect('todo')
    }catch{
        res.render('todo/index', {
            errorMessage: 'Todo create error!'
        })
    }
})

module.exports = router;
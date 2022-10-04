const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Todo = require('../model/addTodo')

router.use(express.urlencoded({extended: true}))
router.use(express.json())

router.get('/', async (req, res) => {
    res.render('todo/index')
})
router.get('/generate', async (req, res) => {
    let todos = await Todo.find({})
    res.send(todos)
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

router.delete('/', async(req, res) => {
    const id = new mongoose.Types.ObjectId(req.body.id);
    try{
        const deleteTodo = await Todo.deleteOne({_id: id})
        res.sendStatus(200)
    }catch{
        res.sendStatus(400)
    }

})

router.put('/', async (req, res) => {
    const body = req.body;
    const findedTodo = await Todo.findOne({_id: new mongoose.Types.ObjectId(body.id)});
    if(req.body.text !== '' && req.body.text != null){
        findedTodo.text = await body.text;
        findedTodo.save()
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
    
})

module.exports = router;
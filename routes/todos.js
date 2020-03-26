const { Router } = require('express')

const Todo = require('../models/Todo')
const router = Router()


/* GET Todos page. */
router.get('/todos', async (req, res) => {
  const todos = await Todo.find({})
  res.render('index', {
    title: 'Список задач',
    isTodos: true,
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Создать задачу',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  })

  await todo.save()
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)

  todo.completed = !!req.body.completed
  await todo.save()

  res.redirect('/')
})



module.exports = router

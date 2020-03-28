const { Router } = require('express')

const Todo = require('../models/Todo')
const router = Router()


/* GET Todos page. */
router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean();
  res.render('todos', {
    title: 'Список задач',
    isTodos: true,
    todos,
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
  res.redirect('/todos')
})

router.post('/complete', async (req, res) => {
  try {
    const {id} = req.body;
    console.log(id);
    const todo = await Todo.findById(id).lean();// but need BSON ((
    console.log(`todo from DB: ${todo}`);
    todo.completed = req.body.completed
    await todo.save();
    res.redirect('/todos')
  } catch (error) {
    console.log(`Do not change status todo ${todo}. \nError: ${error}`);
  }
})


module.exports = router

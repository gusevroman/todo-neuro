const { Router } = require('express')

const Todo = require('../models/Todo')
const todo_controller = require('../controllers/todo.controller')
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

router.post('/complete', (req, res) => {
  try {
    const { id, completed } = req.body;
    Todo.findById(id)
      .then(data => {
        data.completed = !!completed;
        console.log(`data IN Todo ${data.completed}`);
        data.save();
        res.redirect('/todos')
      }
      ).catch((error) => {
        console.log(`Don\'t change status todo. \n ${error}`);
      });
  } catch (error) {
    console.log(`Do not change status todo ${todo}. \nError: ${error}`);
  }
})

router.post('/delete', (req, res) => {
  try {
    const { id } = req.body;
    Todo.findByIdAndDelete(id)
      .then(
        res.redirect('/todos')
      )
      .catch(
        error => console.log('Todo was not deleted', error)
      )
  } catch (error) {
    console.log(`Todo wasn\'t removed. \n Error: \n${error}`);
  }
})


module.exports = router

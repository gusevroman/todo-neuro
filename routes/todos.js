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

router.delete('delete/:id', (req, res) => {
  try {
    console.log(`req.params: ${req.params}`);
    const { id } = req.params;
    Todo.delete(id)

  } catch (error) {
    console.log(`Todo ${req.params.id} don\'t removed. \n ${error}`);
  }
})


module.exports = router

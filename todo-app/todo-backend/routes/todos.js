const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  const getdb = await redis.getAsync("added_todos")
  const parsedb = parseInt(getdb) ? parseInt(getdb) : 0
  await redis.setAsync("added_todos", (parsedb + 1))
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body, req.todo._id)
  await Todo.findByIdAndUpdate(req.todo._id, req.body);
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

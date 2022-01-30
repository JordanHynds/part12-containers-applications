const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

//check if redis database has been initialized
const initializedb = async () => {
  const checkRedis = await redis.getAsync("added_todos")
  if (!checkRedis) {
    const test = await redis.setAsync("added_todos", 0)
  }
}
initializedb();

/* GET index data. */
router.get('/', async (req, res) => {
  console.log("test")
  visits++
  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const checkRedis = await redis.getAsync("added_todos")
  const parsedb = parseInt(checkRedis) ? parseInt(checkRedis) : 0
  const redisdb = JSON.stringify({
    "added_todos": parsedb
  })
  res.send(redisdb)
})

module.exports = router;

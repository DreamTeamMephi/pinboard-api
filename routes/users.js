import express from 'express';
import User from '../models/user';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  //res.send('respond with a resource');
  let result = await User.findAll({});
  res.json(result);
});

router.post('/', async (req, res, next) => {
  let promise = User.create({
    firstName: 'lalka',
    lastName: 'sosalka'
  })
  console.log(promise)
  let result = await promise;
  console.log(result)
  res.json(result);
})

module.exports = router;

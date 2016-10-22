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
  try{
    let promise = User.create(req.body)

    console.log(promise)
    let result = await promise;
    console.log(result)
    res.json(result);
  } catch (err){
    res.json(err)
  }
})

module.exports = router;

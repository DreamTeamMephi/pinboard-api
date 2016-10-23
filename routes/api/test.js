import { Router } from 'express'
import User from '../../models/user'
import Board from '../../models/board'
import Card from '../../models/card'
import checkAuth from '../../utils/check-auth'


let router = Router();

router.post('/dropAllDatabase', (req, res, next) => {
  User.sync({force: true})
  Board.sync({force: true})
  Card.sync({force: true})
  res.json({zbs: 'Da'})
})


module.exports = router

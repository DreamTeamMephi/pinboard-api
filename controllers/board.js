import User from '../models/user'
import Board from '../models/board'
import Advert from '../models/advert'

let board = {};

board.createBoard = async (req, res, next) => {
  try{
    let boardBody = req.body
    boardBody.owner_id = req.user.id
    boardBody.posts_count = 0
    boardBody.last_post_date = Date.now()

    let boardObject = await Board.create(boardBody)
    req.board = boardObject
    next()
  } catch (ex){
    next(ex);
  }
}

board.sendBoard = (req, res, next) => {
  res.json(req.board)
}

board.postAdvert = async (req, res, next) => {
  try{
    let advertBody = req.body
    advertBody.owner_id = req.user.id
    advertBody.board_id = req.params.id
    advertBody.rating = 0
    let advertObject = await Advert.create(advertBody)
    req.advert = advertObject
    //also update counters on connected board
    let boardObject = await Board.findById(req.params.id)
    boardObject.increment('posts_count')
    boardObject.last_post_date = Date.now();
    await boardObject.save();
    next();
  } catch (ex){
    next(ex)
  }
}

board.sendAdvert = (req, res, next) => {
  res.json(req.advert)
}

board.getBoardsList = (req, res, next) => {
  
}

export default board;
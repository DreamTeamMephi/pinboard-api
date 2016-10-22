import User from '../models/user'
import Board from '../models/board'
import Card from '../models/card'

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

board.postCard = async (req, res, next) => {
  try{
    let cardBody = req.body
    cardBody.owner_id = req.user.id
    cardBody.board_id = req.params.id
    cardBody.rating = 0
    let cardObject = await Card.create(cardBody)
    req.card = cardObject
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

board.sendCard = (req, res, next) => {
  res.json(req.card)
}

board.getBoardsList = async (req, res, next) => {
  try{
    let offset = req.query.offset || 0
    let count = req.query.count || 20
    let boards = await Board.findAll({ offset: offset, limit: count })
    res.json({
      boards: boards  
    });
  } catch (ex) {
    next(ex)
  }
}

board.getCards = async (req, res, next) => {
  try{
    let offset = req.query.offset || 0
    let count = req.query.count || 20
    let boards = await Card.findAll({ offset: offset, limit: count, where: {board_id: req.params.id} })
    res.json({
      cards: boards  
    });
  } catch (ex) {
    next(ex)
  }
}


export default board;
import { Router } from 'express';
import board from '../../controllers/board';
import checkAuth from '../../utils/check-auth'


let router = Router();

router.get('/', board.getBoardsList)

router.post('/', checkAuth, board.createBoard, board.sendBoard)

router.post('/:id/postCard', checkAuth, board.postCard, board.sendCard)

router.get('/:id/', board.getCards)

module.exports = router;

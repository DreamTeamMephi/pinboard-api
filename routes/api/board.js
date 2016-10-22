import { Router } from 'express';
import board from '../../controllers/board';
import checkAuth from '../../utils/check-auth'


let router = Router();

router.get('/', board.getBoardsList)

router.post('/', checkAuth, board.createBoard, board.sendBoard)

router.post('/:id/postAdvert', checkAuth, board.postAdvert, board.sendAdvert)

module.exports = router;

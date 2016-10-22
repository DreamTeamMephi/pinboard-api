import { Router } from 'express';
import user from '../../controllers/user';
import checkAuth from '../../utils/check-auth'


let router = Router();

router.put('/updateInfo', checkAuth, user.updateInfo, user.sendUser)


module.exports = router;

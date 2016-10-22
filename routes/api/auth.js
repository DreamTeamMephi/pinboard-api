import { Router } from 'express';
import user from '../../controllers/user';
//import verification from '../../controllers/verification';

let router = Router();

router.post('/local/register', user.register, user.sendUser)

//router.get('/', user.sendUser);

//router.post('/local/register', user.localLogin, user.register, verification.sendVerification, user.sendUser);

// router.post('/local/login', user.localLogin, user.sendUser);

// router.put('/login', user.tokenLogin);

// router.post('/logout', user.logout, user.sendUser);

module.exports = router;

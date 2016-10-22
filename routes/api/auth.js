import { Router } from 'express';
import user from '../../controllers/user';
//import verification from '../../controllers/verification';

let router = Router();

router.post('/local/register', user.localRegister, user.sendUser)

router.get('/token', user.sendToken)

router.post('/local/login', user.localLogin, user.sendUser);

router.get('/sessionInfo', user.printSessionInfo)

router.post('/logout', user.logout, user.printSessionInfo);

//router.get('/', user.sendUser);

//router.post('/local/register', user.localLogin, user.register, verification.sendVerification, user.sendUser);

// router.post('/local/login', user.localLogin, user.sendUser);

// router.put('/login', user.tokenLogin);

// router.post('/logout', user.logout, user.sendUser);

module.exports = router;

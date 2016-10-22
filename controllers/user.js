import User from '../models/user'
import password from '../utils/password'
import passport from 'passport'

let user = {};

user.localRegister = async (req, res, next) => {
    try {
        let user = req.body;
        log.info(user);
        if (!user.password) return next('NO_PASSWORD_GIVEN');
        let passwordObject = await password.getLocal(user.password);
        user.local_hash = passwordObject.hash;
        user.local_salt = passwordObject.salt;
        user.local_iterations = passwordObject.iterations;

        let userObject = await User.create(user); 
        req.user = userObject;
        next();
    } catch(ex) {
        console.log(ex);
        next(ex);
    }
    
}

user.localLogin = (req, res, next) => {
    let loginBody = req.body.user ? req.body.user : req.body
    console.log('localLogin', loginBody.email)

    if (req.user) return next()

    if (!loginBody.email || !loginBody.password) return next('MISSING_CREDENTIALS')

    Object.assign(req.body, loginBody)

    return passport.authenticate('local', function (err, user, info) {
        if (err) return next(err)
        if (!user) return next('NO_SUCH_USER')
        req.logIn(user, next)
    })(req, res, next)
}

user.sendUser = (req, res, next) => {
    let user = req.user ? req.user.get() : null;
    if (user){
        delete user.local_hash;
        delete user.local_iterations;
        delete user.local_salt;
    }

    res.json({
        user: user
    });
}

user.sendToken = (req, res, next) => {
    res.json(req.session);
    log.info(req.session);
}

user.printSessionInfo = (req, res, next) => {
    res.json({
        session: req.session,
        user: req.user    
    });
}

user.logout = (req, res, next) => {
  req.logOut()
  next()
}

export default user;
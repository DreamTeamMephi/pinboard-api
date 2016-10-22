import User from '../models/user'
import password from '../utils/password'

let user = {};

user.register = async (req, res, next) => {
    try {
        let user = req.body;
        log.info(user);
        if (!user.password) return next('NO_PASSWORD_GIVEN');
        let passwordObject = await password.getLocal(user.password);
        user.local_hash = passwordObject.hash;
        user.local_salt = passwordObject.salt;
        user.local_iterations = passwordObject.iterations;

        // we don't need an entity in this case, just plain object is fine
        let userObject = await User.create(user, { raw: true }); 
        req.user = userObject;
        next();
    } catch(ex) {
        console.log(ex);
        next(ex);
    }
    
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

export default user;
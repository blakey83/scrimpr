import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user.js';

passport.use(new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
    const user = await User.findOne({ email: username }).exec();
    if(!user) {
        return done(null, false, {message: 'Invalid username or password' });
    }
    const passwordOK = await user.comparePassword(password);
    if(!passwordOK) {
        return done(null, false, {message: 'Invalid username or password' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async   (id, done) => {
    try {
        const user = await User.findById(id).exec();
        return done(null, user);
    } catch(e) {
        return done(e)
    }
})

export function setUser(req, res, next) {
    res.locals.user = req.user;
    return next();
};

export const initialize = passport.initialize();
export const session = passport.session();

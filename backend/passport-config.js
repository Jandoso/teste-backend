const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const initializa = (passport, getUserByEmail, getUserById) => {
    const authenticateDealer = async (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null) {
            return done(null, false, { message: 'No user with this email'});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error)
        }
    } 

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done (null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize;
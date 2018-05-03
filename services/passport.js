const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // verify username and passord
    console.log('input', email, password)

    User.findOne({ email: email}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false) }

        // compare apsswords 
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err) }
            return done(null, user);
        })
    })
})

// setup options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create strategy 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // SEe if the user ID in the pyload exists in our database 
    // if it does call done
    // otherwise call done without a user object
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }

        console.log(user);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
})

// tell passport to use strategry
passport.use(jwtLogin);
passport.use(localLogin);


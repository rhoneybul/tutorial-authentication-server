const User = require("../models/user");
const jwt = require("jwt-simple")
const config = require("../config");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
    // console.log(req.user)
    // user has had email and apssword authenticated
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.stats(422).send({ error: 'you must provide an email and password '});
    }

    // // see if a user with given email address
    User.findOne({email: email}, function(err, existingUser) {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: "Email is in use" })
        }
    })

    const user = new User({
        email: email,
        password: password
    })
    
    user.save(function(err) {
        if (err) {
            return next(err);
        }

        res.json({ token: tokenForUser(user) })
    })


    // res.json(user);
    // user.save(function(err) {
    //     if (err) { return next(err); }

    //     res.json(user);
    // });
    //if a user exists reutrn an email

    // if not create and save user
}
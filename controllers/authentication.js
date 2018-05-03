const User = require("../models/user");

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    // res.send({
    //     email: email,
    //     password: password
    // })

    // console.log(email);
    // console.log(password);
    
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

        res.json(user)
    })


    // res.json(user);
    // user.save(function(err) {
    //     if (err) { return next(err); }

    //     res.json(user);
    // });
    //if a user exists reutrn an email

    // if not create and save user
}
var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');

exports.hash = function(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

exports.isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    request.status(401);
    return request.send({message: 'Please log in.'});
    request.flash('UnautherizedMessage', 'Not Authorized');
};

exports.serializeUser = function(user, done) {
    return done(null, user._id.id);
};

exports.deserializeUser = function(Students, Tutors) {
    return function(id, done) {
        id = new mongoose.Types.ObjectId(id)
        Students.findById(id).exec().then(function(student) {
            if (student) {
                 return done(null, student);
            }
            Tutors.findById(id).exec().then(function(tutor) {
                return done(null, tutor);
            },
            function(error) {
                done(error);
            });
        },
        function(error) {
            done(error);
        });
    };
};

exports.register = function(Model) {
    return function(request, email, password, done) {
        Model.findOne({email: email}).exec().then(function(user) {
            if (user) {
                return done(null, false, {message: "User already exists"});
            }
            var newUser = new Model();
            newUser.name = request.body.fullName;
            newUser.email = email;
            newUser.setPassword(password);
            newUser.courses = request.body.courses.map(function(id) {return new mongoose.Types.ObjectId(id)});
            newUser.save(function(err) {
                // TODO: handle error
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            })
        }, function(error) {
            done(error);
        });
    };
};

exports.login = function(Model) {
    return function(request, email, password, done) {
        Model.findOne({email: email}).exec().then(
            function(user) {
                if (!user) {
                    return done(null, false, {message: "Looks like that email doesn't exist"});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: "Wrong Password"});
                }
                return done(null, user, {message: "success"});
            }, function(error) {
                done(error);
            });
    };
};

exports.handler = function(passport, strategy) {
    return function(request, response, next) {
        passport.authenticate(strategy, function(error, user, info) {
            if (error) {
                return next(error);
            }
            if (!user) {
                response.status(401);
                return response.send(info);
            }
            request.login(user, function(error) {
                if (error) {
                    return next(error);
                }
                return response.json(user);
            })
        })(request, response, next);
    };
};

exports.success = function(request, response) {
    response.send(200);
};
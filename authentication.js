var mongoose = require('mongoose');

// TODO: salt and hash passwords.
function encrypt(password) {
    return password;
}

exports.encrypt = encrypt;

exports.isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
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
            newUser.email = email;
            newUser.password = encrypt(password);
            newUser.courses = ['Math'];
            newUser.save(function(err) {
                // TODO: handle error
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
                    return done(null, false, {message: "Wrong Email"});
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
                return response.send(info.message);
            }
            request.login(user, function(error) {
                if (error) {
                    return next(error);
                }
                return response.send("success");
            })
        })(request, response, next);
    };
};

exports.success = function(request, response) {
    response.send(200);
};
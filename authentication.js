function encrypt(password) {
    return password;
}

exports.encrypt = encrypt;

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('UnautherizedMessage', 'Not Authorized');
};

exports.serializeUser = function(user, done) {
    return done(null, user._id);
};

exports.deserializeUser = function(Students, Tutors) {
    return function(id, done) {
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
                return done(null, false, req.flash('SignupMessage',
                    'That email is already taken.'));
            }
            var newUser = new Model();
            newUser.email = email;
            newUser.password = encrypt(password);
            newUser.courses = request.body.user.courses;
            newUser.save().exec().then(function(err) {
                // TODO: handle error
                return done(null, newUser);
            });
        },
        function(error) {
            done(error);
        });
    };
};

exports.login = function(Model) {
    return function(request, email, password, done) {
        Model.findOne({email: email, password: encrypt(password)}).exec().then(
            function(user) {
                if (!user) {
                    return done(null, false, req.flash('LoginMessage', 'No user found.'));
                }
                return done(null, user);
            },
            function(error) {
                done(error);
            });
    };
};
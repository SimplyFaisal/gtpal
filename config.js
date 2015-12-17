module.exports = function(env) {
    var config = {};

    config.dev = {
        sessionSecret: 'supersecret',
        database: {
            uri: 'mongodb://localhost/gtpal'
        }
    };

    config.prod = {
        database: {

        }
    };

    config.test = {
        database: {

        }
    }

    return config[env || 'dev'];
};
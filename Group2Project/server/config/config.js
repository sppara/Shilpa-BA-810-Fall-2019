var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'ClassPlanning'
        },
        port: 5000,
        db: 'mongodb://127.0.0.1/todo-dev',
        secret: 'cayennedlikedhistreats'
    },
    production: {
        root: rootPath,
        app: {
            name: 'ClassPlanning'
        },
        port: 80,
        db: 'mongodb://127.0.0.1/todo'
    },
    test: {
        root: rootPath,
        app: {
            name: 'ClassPlanning'
        },
        port: 4000,
        db: 'mongodb://127.0.0.1/todo-test'

    },
};

module.exports = config[env];
'use strict'
var express = require('express'),
    async = require('async'),
        router = express.Router(),
        logger = require('../../config/logger'),
        mongoose = require('mongoose'),
        Todo = mongoose.model('Todo'),
        multer = require('multer'),
        mkdirp = require('mkdirp')

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/todos').get(function (req, res, next) {
        logger.log('info', 'Get all todos');
        var query = Todo.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({
                        message: "No todos"
                    });
                }
            })
            .catch(err => {
                return next(err);
            });
    });


    router.route('/todos/user/:id').get(function (req, res, next) {
        logger.log('info', 'Get all a users todos');
        var query = Todo.find({
                userId: req.params.id
            })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({
                        message: "No todos"
                    });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/todos').post((req, res, next) => {
        logger.log('info', 'Create Todo');
        var todo = new Todo(req.body);
        todo.save()
            .then(result => {
                res.status(201).json(result);
            }).catch((error) => {
                return next(error);
            });
    });

    router.route('/todos/:id').put((req, res, next) => {
        logger.log('info', 'Get todo %s', req.params.id);
        Todo.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true,
                multi: false
            })
            .then(todo => {
                res.status(200).json(todo);
            })
            .catch(error => {
                return next(error);
            });
    });


    router.route('/todos/:id').delete((req, res, next) => {
        logger.log('info', 'Delete todo %s', req.params.id);
        Todo.remove({
                _id: req.params.id
            })
            .then(todo => {
                res.status(200).json({
                    msg: "Todo Deleted"
                });
            })
            .catch(error => {
                return next(error);
            });
    });

};
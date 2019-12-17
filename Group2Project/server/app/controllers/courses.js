'use strict'
var express = require('express'),
    async = require('async'),
        router = express.Router(),
        logger = require('../../config/logger'),
        mongoose = require('mongoose'),
        Course = mongoose.model('Course'),
        multer = require('multer'),
        mkdirp = require('mkdirp')

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/courses').get(function (req, res, next) {
        logger.log('info', 'Get all courses');
        var query = Course.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({
                        message: "No courses"
                    });
                }
            })
            .catch(err => {
                return next(err);
            });
    });


    router.route('/courses/student/:id').get(function (req, res, next) {
        logger.log('info', 'Get all a users courses');
        var query = Course.find({
                studentId: req.params.id
            })
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({
                        message: "No courses"
                    });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/courses').post((req, res, next) => {
        logger.log('info', 'Create Course');
        var course = new Course(req.body);
        course.save()
            .then(result => {
                res.status(201).json(result);
            }).catch((error) => {
                return next(error);
            });
    });

    router.route('/courses/:id').put((req, res, next) => {
        logger.log('info', 'Get course %s', req.params.id);
        Course.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true,
                multi: false
            })
            .then(course => {
                res.status(200).json(course);
            })
            .catch(error => {
                return next(error);
            });
    });


    router.route('/courses/:id').delete((req, res, next) => {
        logger.log('info', 'Delete course %s', req.params.id);
        Course.remove({
                _id: req.params.id
            })
            .then(course => {
                res.status(200).json({
                    msg: "Course Deleted"
                });
            })
            .catch(error => {
                return next(error);
            });
    });

};
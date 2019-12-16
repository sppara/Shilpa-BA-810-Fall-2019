'use strict'
const express = require('express'),
    async = require('async'),
        router = express.Router(),
        logger = require('../../config/logger'),
        mongoose = require('mongoose'),
        Student = mongoose.model('Student'),
        passportService = require('../../config/passport'),
        passport = require('passport');

const requireLogin = passport.authenticate('local', {
    session: false
});
const requireAuth = passport.authenticate('jwt', {
    session: false
});

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/students').get(requireAuth, function (req, res, next) {
        logger.log('info', 'Get all students');
        var query = Student.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({
                        message: "No students"
                    });
                }
            })
            .catch(error => {
                return next(error);
            });
    });
    router.route('/students').post((req, res, next) => {
        logger.log('info', 'Create Student');
        var student = new Student(req.body);
        student.save()
            .then(result => {
                res.status(201).json(result);
            }).catch((err) => {
                return next(err);
            });
    });

    router.route('/students/login').post(requireLogin, login);

    router.route('/students/:id').get(requireAuth, (req, res, next) => {
        logger.log('info', 'Get student %s', req.params.id);
        Student.findById(req.params.id)
            .then(student => {
                if (student) {
                    res.status(200).json(student);
                } else {
                    res.status(404).json({
                        message: "No student found"
                    });
                }
            })
            .catch(error => {
                return next(error);
            });
    });
    router.route('/students/:id').put(requireAuth, (req, res, next) => {
        logger.log('info', 'Get student %s', req.params.id);
        Student.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true,
                multi: false
            })
            .then(student => {
                res.status(200).json(student);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.put('/students/password/:id', function (req, res, next) {
        logger.log('info', 'Update student ' + req.params.id);

        Student.findById(req.params.id)
            .exec()
            .then(function (student) {
                if (req.body.password !== undefined) {
                    student.password = req.body.password;
                }
                student.save()
                    .then(function (student) {
                        res.status(200).json(student);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/students/:id').delete(requireAuth, (req, res, next) => {
        logger.log('info', 'Delete student %s', req.params.id);
        Student.remove({
                _id: req.params.id
            })
            .then(student => {
                res.status(200).json({
                    msg: "Student Deleted"
                });
            })
            .catch(error => {
                return next(error);
            });
    });

};
'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Widget = mongoose.model('Widgets');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get all Widgets');
        var query = Widget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Widgets" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').get((req, res, next) => {
        logger.log('info', 'Get Widget %s', req.params.id);
        Widget.findById(req.params.id)
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No widget found" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/widgets/:id').put((req, res, next) => {
        logger.log('info', 'Get Widget %s', req.params.id);
        Widget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/widgets').post((req, res, next) => {
        console.log('posting...')
        logger.log('info', 'Create Widget');
        var widget = new Widget(req.body);
        widget.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').delete((req, res, next) => {
        logger.log('info', 'Delete Widget ' + req.params.id);
        Widget.remove({ _id: req.params.id })
            .then(todo => {
                res.status(200).json({ msg: "Widget Deleted" });
            })
            .catch(error => {
                return next(error);
            });

    });

};
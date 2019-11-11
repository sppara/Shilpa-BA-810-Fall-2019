const express = require('express')
const app = express()

// Use middlewares
app.use(express.json())

const mongoose = require('mongoose')

// Require the database connection
require('./connection')

// Require the widget database schema
const widgetSchema = require('./SchemaWidgets')

const widgets = mongoose.model('Widget', widgetSchema)

// GET	Get all widgets
app.get('/widgets', function (req, res) {
    widgets.find({}, function (error, result) {
        if (error) {
            // Display the error
            console.log(error)
            res.status(400).json({
                'status': 'error',
                'reason': 'Bad Request'
            });
        }
        else {
            res.json({
                'status': 'success',
                data: result
            });
        }
    })
})

// GET	Get a widget based on its id
app.get('/widgets/:id', function (req, res) {
    let widgetID = req.params.id
    widgets.findById(widgetID, function (error, result) {
        if (error) {
            // Display the error
            console.log(error)
            res.status(400).json({
                'status': 'error',
                'reason': 'Bad Request'
            });
        } else if (!result) {
            res.status(404).json({
                'status': 'error',
                'reason': 'Not Found'
            });
        } else {
            res.json({
                'status': 'success',
                data: result
            });
        }
    })
})

// POST	Create widget
app.post('/widgets', function (req, res) {
    let requiredData = ['woo', 'foo']
    let errorObject = {}

    // Check for missing payload
    for (let i of requiredData) {
        if (!(i in req.body)) {
            errorObject[i] = {
                type: i == 'woo' ? 'required number ' : 'required string'
            }
        }
    }
    if (Object.keys(errorObject).length > 0) {
        res.status(400).json({
            'status': 'error',
            'reason': 'Payload is not properly filled',
            'errors': errorObject
        });
    }
    else {
        let widgetFoo = req.body.foo

        // Convert to string to work with match
        let widgetWoo = String(req.body.woo)


        if (widgetWoo.match(/\D+/igm)) {
            res.status(400).json({
                'status': 'error',
                'reason': 'Please provide a number in foo field',
                'errors': {
                    woo: {
                        type: 'required number'
                    }
                }
            })
        } else {
            widgets.create({
                foo: widgetFoo,
                woo: widgetWoo
            }, function (error, result) {
                console.log(result)
                if (error) {
                    // Display the error
                    console.log(error)
                    res.status(500).json({
                        'status': 'error',
                        'reason': 'Internal Server Error'
                    });
                } else {
                    res.json({
                        'status': 'success',
                        'data': result
                    });
                }
            })
        }
    }
})

// PUT	Update a widget
app.put('/widgets/:id', function (req, res) {
    let widgetID = req.params.id
    let entryData = req.body
    let allowedData = ['woo', 'foo']

    // Trim the payload to remove unwanted data
    for (let i in entryData) {
        if (allowedData.indexOf(i) < 0) {
            delete entryData[i]
        }
    }

    console.log('entry', entryData)

    // Now find and update
    widgets.findOneAndUpdate({ _id: widgetID }, entryData, { new: true }, function (error, doc, result) {
        if (error) {
            // Display the error
            console.log(error)
            res.status(400).json({
                'status': 'error',
                'reason': 'Bad Request'
            });
        }
        else if (!doc) {
            res.status(404).json({
                'status': 'error',
                'reason': 'Not Found'
            });
        } else {
            res.json({
                'status': 'success',
                data: doc
            });
        }
    })

})
// DELETE	Delete a widget
app.delete('/widgets/:id', function (req, res) {
    let widgetID = req.params.id || false

    widgets.findOneAndDelete({ _id: widgetID }, function (error, result) {
        if (error) {
            // Display the error
            console.log(error)
            res.status(400).json({
                'status': 'error',
                'reason': 'Bad Request'
            });
        }
        else if (!result) {
            res.status(404).json({
                'status': 'error',
                'reason': 'Not Found'
            });
        }
        else {
            res.json({
                'status': 'success',
            });
        }
    })
})

app.listen(3000, () => {
    console.log(`Server started on port`);
});

// In order to enable test
module.exports = app;

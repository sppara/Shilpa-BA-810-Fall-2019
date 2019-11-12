const express = require('express')
const app = express()

// Use middlewares
app.use(express.json())

const mongoose = require('mongoose')

// Require the database connection
require('./connection')

// Require the gadget database schema
const gadgetSchema = require('./SchemaGadgets')

const gadgets = mongoose.model('Gadget', gadgetSchema)

// GET	Get all gadgets
app.get('/gadgets', function (req, res) {
    gadgets.find({}, function (error, result) {
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

// GET	Get a gadget based on its id
app.get('/gadgets/:id', function (req, res) {
    let gadgetID = req.params.id
    gadgets.findById(gadgetID, function (error, result) {
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

// POST	Create gadget
app.post('/gadgets', function (req, res) {
    let requiredData = ['Hoo', 'Yoo']
    let errorObject = {}

    // Check for missing payload
    for (let i of requiredData) {
        if (!(i in req.body)) {
            errorObject[i] = {
                type: i == 'Hoo' ? 'required number ' : 'required string'
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
        let gadgetYoo = req.body.Yoo

        // Convert to string to work with match
        let gadgetHoo = String(req.body.Hoo)


        if (gadgetHoo.match(/\D+/igm)) {
            res.status(400).json({
                'status': 'error',
                'reason': 'Please provide a number in Yoo field',
                'errors': {
                    Hoo: {
                        type: 'required number'
                    }
                }
            })
        } else {
            gadgets.create({
                Yoo: gadgetYoo,
                Hoo: gadgetHoo
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

// PUT	Update a gadget
app.put('/gadgets/:id', function (req, res) {
    let gadgetID = req.params.id
    let entryData = req.body
    let allowedData = ['Hoo', 'Yoo']

    // Trim the payload to remove unwanted data
    for (let i in entryData) {
        if (allowedData.indexOf(i) < 0) {
            delete entryData[i]
        }
    }

    console.log('entry', entryData)

    // Now find and update
    gadgets.findOneAndUpdate({ _id: gadgetID }, entryData, { new: true }, function (error, doc, result) {
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
// DELETE	Delete a gadget
app.delete('/gadgets/:id', function (req, res) {
    let gadgetID = req.params.id || false

    gadgets.findOneAndDelete({ _id: gadgetID }, function (error, result) {
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

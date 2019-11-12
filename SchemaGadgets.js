// require moongoose database
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a new Schema
 gadget = new Schema({
    Yoo: { type: String, required: true },
    Hoo: { type: Number, default: 10 }
});


module.exports = gadget
// require moongoose database
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a new Schema
 widget = new Schema({
    foo: { type: String, required: true },
    woo: { type: Number, default: 10 }
});


module.exports = widget
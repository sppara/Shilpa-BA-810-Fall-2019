var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var WidgetSchema = new Schema({
    Boo: { type: String },
    Hoo: { type: Date, default: Date.now() }
});

module.exports = Mongoose.model('Widgets', WidgetSchema);
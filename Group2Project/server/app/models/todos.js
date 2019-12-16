var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    detail: {
        type: String,
    },
    dateCreated: {
        type: String,
        default: Date.now
    },
    dateDue: {
        type: String,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Todo', 'In Process', 'Completed'],
        default: 'Todo'
    },
    file: {
        fileName: String,
        originalName: String
    }
});

module.exports =
    Mongoose.model('Todo', TodoSchema);
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var CourseSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    course: {
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
    Mongoose.model('Course', CourseSchema);
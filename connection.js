const mongoose = require('mongoose');

let databaseName = 'AssignmentProject'
mongoose.connect('mongodb://localhost:27017/'+databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function() {
  // console.log('then')
})

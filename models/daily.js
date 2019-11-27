var mongoose = require('mongoose');
var SubTask = require('../models/subtask');


var dailySchema =  mongoose.Schema({
    title: String,
    detail: String,
    subTasks: [{type: mongoose.Schema.Types.ObjectId,
                ref: SubTask}],
    done: {type: Boolean , default: false},
    dropdown: {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', dailySchema);
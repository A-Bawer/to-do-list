    var mongoose = require('mongoose');

    var subTaskSchema = mongoose.Schema({
        title: String,
        detail:String,
        shortTerm: {type: Boolean, default: true},
        miniTasks: [],
        done: {type: Boolean, default: false}
    });

    module.exports = mongoose.model('subtask', subTaskSchema);
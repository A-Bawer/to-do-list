var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    index = require('./routes/index'),
    subtask = require('./routes/subtask'),
    flash   = require('connect-flash'),
    longTerm    = require('./routes/long-term');

    app.set('view engine', 'ejs');
    app.use(flash());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static( __dirname + '/public'));
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect('mongodb://localhost/to-do-list-project', {useNewUrlParser:true});
    app.use(methodOverride('_method'));


    // index route
    app.use(index);

    // subtask route 
    app.use(subtask);

    // long-term route
    app.use(longTerm);


app.listen(3000, function(){
    console.log("your server started on port 3000");
});
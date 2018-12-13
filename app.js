const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRouter = require('./routes/index');
const addStoryRouter = require('./routes/addStory');
const addProcessor = require('./routes/addProcessor');
const editor = require('./routes/editor');
const editorProcessor = require('./routes/editorProcessor');



//Express init
var app = express();

// ejs view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static path
app.use(express.static(path.join(__dirname, 'public')));

//Validator

//Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    res.locals.savedStories = null;
    next();
});

app.use('/', indexRouter);
app.use('/story', addStoryRouter);
app.use('/stories/add', addProcessor);
app.use('/story/([0-9])+$', editor);
app.use('/stories/edit/([0-9])+$', editorProcessor);

app.listen(3000, function(){
    console.log("server running!");  
})

module.exports = app;
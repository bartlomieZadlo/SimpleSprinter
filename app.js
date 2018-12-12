var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyparser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.send("hello worlds")
});

app.listen(3000, function(){
    console.log("server running!");  
})
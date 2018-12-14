const Story = require('../classes/story');
var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');
const fs = require('fs');
const validation = require('../classes/validator');
const csvParserImpl = require('../classes/parserConstructor');

router.use(expressValidator());

router.post('/', function(req, res){
    
    let csvParser = csvParserImpl();
    
    let passedValues = req.body;
    
    errors = validation(req, passedValues);
    
    if (errors){
        res.render('addStory',{
            errors: errors
        })    
    } else{
        let newStory = new Story(passedValues);
        newStory.status = "Planning"
        let csv = csvParser.parse(newStory);
        let outputStream = fs.createWriteStream("public/stories.csv", {flags:'a'});
        outputStream.write(csv + "\n");
        
        res.redirect('/');           
    }
    
    
    });

module.exports = router;
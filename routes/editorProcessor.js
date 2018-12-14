var express = require('express');
var router = express.Router();
const Story = require('../classes/story');
const expressValidator = require('express-validator');
const fs = require('fs');
const bodyParser = require('body-parser');
const validation = require('../classes/validator');
const csvParserImpl = require('../classes/parserConstructor');


router.use(expressValidator());
// Body parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res){
    
    let passedValues = req.body;
    let storyID = req.baseUrl.trim().substr(-1); 
    errors = validation(req, passedValues);
    let csvParser = csvParserImpl();
    
    if (errors){
        res.render('editStory',{
            errors: errors,
            id: storyID,
            savedStory: savedStories[storyID]
        })
    } else{
        let newStory = new Story(passedValues);
        let pickedStatus = req.body.selectpicker;
        if (pickedStatus != "Current"){
            newStory.status = pickedStatus;
        }
        
        savedStories[storyID] = newStory;
        let csv = csvParser.parse(savedStories);
        let outputStream = fs.createWriteStream("public/stories.csv");
        outputStream.write(csv + "\n");
        
        res.redirect('/');
        
    }
    
    
});

module.exports = router;
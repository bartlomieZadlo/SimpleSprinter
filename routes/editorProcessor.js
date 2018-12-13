var express = require('express');
var router = express.Router();
const Story = require('../classes/story');
const expressValidator = require('express-validator');
const fs = require('fs');
const bodyParser = require('body-parser');


router.use(expressValidator());
// Body parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res){
    //Json to csv Parser
    let Json2csvParser = require('json2csv').Parser;
    let fields = ['story_title', 'story_description','acceptance_criteria', 'business_value',  'estimation', 'status'];
    let json2csvParser = new Json2csvParser({fields, header:false, eol:'\n'}); 

    

    let passedValues = req.body;
    let storyID = req.baseUrl.trim().substr(-1); 

    // Title validation
    req.checkBody('story_title', 'Story title is required').notEmpty;
    req.checkBody('story_title', 'Story title minimal lentgth is 5 chars').isLength({min: 5})

    // Description validation
    req.checkBody('story_desc', 'Story Description is required').isLength({min: 1});
    
    //Acceptance criteria validation
    req.checkBody('acceptance_criteria', 'Acceptance criteria is required').isLength({min: 1});


    //Business value validation
    req.checkBody('business_value', 'Business value is required').notEmpty;
    req.checkBody('business_value', 'Business value must be numeric').isNumeric;
    req.checkBody('business_value', 'Business value must be between 100 and 1500').isInt({min: 100, max:1500});
    req.checkBody('business_value', 'Business value must be divisible by 100').isDivisibleBy(100);

    //Estimation validation
    req.checkBody('estimation', 'Estimation value is required').notEmpty;
    req.checkBody('estimation', 'Estimation value must be numeric').isNumeric;
    req.checkBody('estimation', 'Estimation value must be between 0.5 and 40').isFloat({min: 0.5, max:40});
    if (passedValues.estimation != 0.5){
        req.checkBody('estimation', 'Estimation value must be divisible by 0.5').isDivisibleBy(passedValues.estimation, 0.5);
    }
    
    errors = req.validationErrors();
    
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
        let csv = json2csvParser.parse(savedStories);
        let outputStream = fs.createWriteStream("public/stories.csv");
        outputStream.write(csv + "\n");
        
        res.redirect('/');
        
    }
    
    
});

module.exports = router;
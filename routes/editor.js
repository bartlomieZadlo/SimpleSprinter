var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');
router.use(expressValidator());

router.get('/', function(req, res, next) {
    let storyID = req.baseUrl.trim().substr(-1); 
    if(typeof savedStories === 'undefined' || storyID == 0){
        res.redirect('/');
    }
    //savedStories[storyID].story_title = JSON.stringify(savedStories[storyID].story_title);
    
    res.render('editStory', {
        id: storyID,
        savedStory: savedStories[storyID]
    });
});


module.exports = router;
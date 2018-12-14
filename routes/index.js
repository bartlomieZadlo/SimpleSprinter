var express = require('express');
var router = express.Router();
const fs = require('fs');
var CsvReadableStream = require('csv-reader');
const Story = require('../classes/story');

const storyDataColumnIndexes ={
    story_titleCol: 0,
    story_descCol: 1,
    acceptance_criteriaCol: 2,
    business_valueCol: 3,
    estimationCol: 4,
    statusCol: 5
}


router.get('/', function(req, res, next) {
    savedStories = new Array();
    
    let inputStream = fs.createReadStream("public/stories.csv", 'utf8');    
    inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        let passedValues = {
            story_title: row[storyDataColumnIndexes.story_titleCol],
            story_desc: row[storyDataColumnIndexes.story_descCol],
            acceptance_criteria: row[storyDataColumnIndexes.acceptance_criteriaCol],
            business_value: row[storyDataColumnIndexes.business_valueCol],
            estimation: row[storyDataColumnIndexes.estimationCol],
            status: row[storyDataColumnIndexes.statusCol]
        }
        savedStories.push(new Story(passedValues));
    })
    .on('end', function (data) {
        res.render('index', {
            savedStories: savedStories
        });
    });
});

module.exports = router;
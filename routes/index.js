var express = require('express');
var router = express.Router();
const fs = require('fs');
var CsvReadableStream = require('csv-reader');
const Story = require('../classes/story');


router.get('/', function(req, res, next) {
    savedStories = new Array();
    let inputStream = fs.createReadStream("public/stories.csv", 'utf8');    
    inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        let passedValues = {
            story_title: row[0],
            story_desc: row[1],
            acceptance_criteria: row[2],
            business_value: row[3],
            estimation: row[4],
            status: row[5]
        }
        savedStories.push(new Story(passedValues));
    })
    .on('end', function (data) {
        console.log('No more rows!');
        res.render('index', {
            savedStories: savedStories
        });
    });
});

module.exports = router;
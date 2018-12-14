function createParser(){
    let Json2csvParser = require('json2csv').Parser;
    let fields = ['story_title', 'story_description','acceptance_criteria', 'business_value',  'estimation', 'status'];
    return new Json2csvParser({fields, header:false, eol:'\n'}); 
}

module.exports = createParser;
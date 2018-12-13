class Story{
    constructor(passedValues){
    this.story_title = passedValues.story_title;
    this.story_description = passedValues.story_desc;
    this.acceptance_criteria = passedValues.acceptance_criteria;
    this.business_value = passedValues.business_value;
    this.estimation =  passedValues.estimation;
    this.status = passedValues.status;
    }
};

module.exports = Story;
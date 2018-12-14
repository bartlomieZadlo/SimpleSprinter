function validate(req, passedValues){
    req.checkBody('story_title', 'Story title is required').notEmpty;
    req.checkBody('story_title', 'Story title minimal length is 5 chars').isLength({min: 5})

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
    
    return req.validationErrors();
}

module.exports = validate;
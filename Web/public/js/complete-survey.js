const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    /**
     *
     * Gets all of the survey questions seen at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to a survey's questions
     * @return none
     *
     */
    getSurveyQuestions: function(url, surveyID) {
        console.log(url);
        // get request to API endpoint
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            // when data from endpoint has been retrieved
            res.on('end', function() {
                const res = JSON.parse(body);
                // set input and output files for Handlebars template
                const inFile = 'views/complete-survey.hbs';
                const outFile = 'views/complete-survey.html';
                const data = res;
                // console.log(data);
                const source = fs.readFileSync(inFile, 'utf8');
                const template = handlebars.compile(source, {strict: true});
                const result = template(data);
                // console.log(result);
                fs.writeFileSync(outFile, result);
            });
        }).on('error', function(err) {
            console.log(err);
        });
    }
}

// handlebars helper to see if 'this' is an object
// lets me know if there is more nested within 'this'
handlebars.registerHelper('ifObject', function(item, options) {
    if (typeof item === "object") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// handlebars helper to see if 'this' is a multiple choice question
// lets me know if there i should use radio buttons for the question
handlebars.registerHelper('ifMC', function(item, options) {
    if (item.type === "mc") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// handlebars helper to see if the index of 'this'
handlebars.registerHelper('ifFirst', function(index, options) {
    if (index === 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifThird', function(index, options) {
    if (index === 2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifFourth', function(index, options) {
    if (index === 3) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifFifth', function(index, options) {
    if (index === 4) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifSixth', function(index, options) {
    if (index === 5) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifSeventh', function(index, options) {
    if (index === 6) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifEighth', function(index, options) {
    if (index === 7) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

handlebars.registerHelper('ifNinth', function(index, options) {
    if (index === 8) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
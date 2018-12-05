const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    /**
     *
     * Gets all survey results of the survey at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to all of a survey's responses
     * @return none
     *
     */
    getSurveyResults: function(url) {
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
                const inFile = 'views/view-survey.hbs';
                const outFile = 'views/view-survey.html';
                const data = res;
                // console.log(data);
                if (Object.keys(data.responses).length == 0) {
                    const result = '<h3>No results for this survey.</h3>';
                    // console.log(result);
                    fs.writeFileSync(outFile, result);
                    return;
                }
                const source = fs.readFileSync(inFile, 'utf8');
                const template = handlebars.compile(source, {strict: true});
                const result = template(data);
                // console.log(result);
                fs.writeFileSync(outFile, result);
            });
        }).on('error', function(err) {
            console.log(err);
        });
        // request(url, function(err, res, body) {
        //     console.log('error: ', err);
        //     console.log('statusCode: ', res && res.statusCode);
        //     console.log('body: ', body);
        //     const response = JSON.parse(body);
        //     // set input and output files for Handlebars template
        //     const inFile = 'views/view-survey.hbs';
        //     const outFile = 'views/view-survey.html';
        //     const data = response;
        //     console.log(data);
        //     const source = fs.readFileSync(inFile, 'utf8');
        //     const template = handlebars.compile(source, {strict: true});
        //     const result = template(data);
        //     // console.log(result);
        //     fs.writeFileSync(outFile, result);
        // });
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
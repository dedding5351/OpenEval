const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    /**
     *
     * Gets all active surveys seen at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to professor's active surveys
     * @return none
     *
     */
    getActiveSurveys: function(url) {
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
                const inFile = 'views/surveys.hbs';
                const outFile = 'views/surveys.html';
                const data = res.message;
                // console.log(res.message);
                const source = fs.readFileSync(inFile, 'utf8');
                const template = handlebars.compile(source, {strict: true});
                const result = template(data);
                // console.log(result);
                fs.writeFileSync(outFile, result);
            });
        }).on('error', function(err) {
            console.log(err);
        });
    },
    /**
     *
     * Gets all default survey questions
     *
     * @param  url  string, API endpoint pointing to default survey questions
     * @return none
     *
     */
    getDefaultQuestions: function(url) {
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var res = JSON.parse(body);
                // console.log(res.message[0].questions);
                for (var i = 0; i < res.message[0].questions.length; i++) {
                    console.log(res.message[0].questions[i].question + res.message[0].questions[i].type);
                }
            });
        }).on('error', function(err) {
            console.log(err);
        });
    }
}
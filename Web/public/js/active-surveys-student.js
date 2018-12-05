const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    /**
     *
     * Gets all of a student's active surveys seen at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to all a student's active surveys
     * @return none
     *
     */
    getActiveSurveys: function(url) {
        // console.log(url);
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
                const inFile = 'views/active-surveys-student.hbs';
                const outFile = 'views/active-surveys-student.html';
                const data = res;
                // console.log(data);
                if (data.message.length == 0) {
                    const result = '<h3>No active surveys for this class.</h3>';
                    // console.log(result);
                    fs.writeFileSync(outFile, result);
                    return;
                }
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
const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

/**
 *
 * Gets all available courses seen at the given url and
 * constructs a Handlebars template according to the data.
 *
 * @param  url  string, API endpoint pointing to all active courses
 * @return none
 *
 */
// function getAllCourses(url) {
//     https.get(url, function(res) {
//         var body = '';
//         res.on('data', function(chunk) {
//             body += chunk;
//         });
//         res.on('end', function() {
//             const res = JSON.parse(body);
//             const inFile = 'views/all-classes.hbs';
//             const outFile = 'views/all-classes.html';
//             const data = res.message;
//             const source = fs.readFileSync(inFile, 'utf8');
//             const template = handlebars.compile(source, {strict: true});
//             const result = template(data);
//             // console.log(result);
//             fs.writeFileSync(outFile, result);
//         });
//     }).on('error', function(err) {
//         console.log(err);
//     });
// }

module.exports = {
    /**
     *
     * Gets all available courses seen at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to all active courses
     * @return none
     *
     */
    getAllCourses: function(url) {
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
                const inFile = 'views/search.hbs';
                const outFile = 'views/search.html';
                const data = res.message;
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

// getAllCourses('https://openeval-server.herokuapp.com/classes');
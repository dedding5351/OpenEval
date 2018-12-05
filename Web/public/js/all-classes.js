const https = require('https');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
    /**
     *
     * Gets all available courses seen at the given url and
     * constructs a Handlebars template according to the data.
     *
     * @param  url  string, API endpoint pointing to all available courses
     * @return none
     *
     */
    getAllCourses: function(url) {
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
                const inFile = 'views/all-classes.hbs';
                const outFile = 'views/all-classes.html';
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

/**
 *
 * Sends a post request to register a student for a course
 *
 * @param  courseNumber string, the department abbreviation and course number
 * @param  courseName   string, the full descriptive name of the course
 * @param  courseID     string, the mongo ID of the course
 * @return none
 *
 */
// function registerCourse(courseNumber, courseName, courseID) {
//     const JSONBody = {
//         _id: courseID,
//         courseNumber: courseNumber,
//         courseName: courseName
//     };
//     const options = {
//         hostname: 'https://openeval-server.herokuapp.com/registeredCourses/cperez',
//         port: 443,
//         path: '/',
//         method: 'POST'
//     };
//     const req = https.request(options, (res) => {
//         console.log('statusCode: ', res.statusCode);
//         console.log('headers: ', res.headers);
//         res.on('data', (d) => {
//             process.stdout.write(d);
//         });
//     });
//     req.on('error', (e) => {
//         console.error(e);
//     });
//     req.end();
// }

/**
 *
 * Goes through the course list and hides those courses that do not match
 * the search term.
 * If there is no search term, unhide all courses.
 *
 * @param  searchTerm  string, the user's search term (partial course number)
 * @return none
 *
 */
function filterCourses(searchTerm) {
    // console.log(searchTerm);
    courseList = document.getElementById("class-list").getElementsByTagName("li");
    if (searchTerm == "") {
        for (var i = 0; i < courseList.length; i++) {
            courseList[i].style.display = "list-item";
        }
    } else {
        for (var i = 0; i < courseList.length; i++) {
            if (courseList[i].classList[0].toLowerCase().trim().startsWith(searchTerm.toLowerCase()) && courseList[i].innerHTML.startsWith("courseNumber")) {
                courseList[i].style.display = "list-item";
            } else {
                courseList[i].style.display = "none";
            }
        }
    }
}
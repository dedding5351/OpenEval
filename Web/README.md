# OpenEval Web Application Delivery Documentation

## Release Notes

### New software features for this release

* Finished the base version of the application.
  * Login for professors and students
  * Viewing a list of all currently registered courses
  * Viewing a list of all courses offered that semester
  * Viewing the active surveys for a course
  * Viewing the survey responses (for professors)
  * Submitting survey responses (for students)

### Bug fixes made since the last release

* The search bar in `all-classes.html` now updates the class list automatically, without the user having to press a button to update the class list.
* The browser now displays a message when viewing. a class that has no active surveys and when viewing a survey that has no responses.
* Students can now post survey responses.
* Professors can now create new surveys for the course they are looking at.

### Known bugs and defects

* The class list in `all-classes` currently shows the course ID in addition to the course number and course name.
* The class list in `all-classes` now properly hides courses not searched for in the search bar, but the hidden courses still take up space on the screen.
* Professors do not yet have the ability to register themselves for a course when looking at the course listing.

## Install Guide

### Prerequisites

* A terminal
* A web browser

### Dependent libraries

* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Download instructions

* The code for the web application can be found [here](https://github.com/dedding4341/OpenEval/tree/master/Web) or [here](https://github.com/davidherszenhaut/OpenEvalWebApplication).
* A copy of the code can be gotten by cloning the repository using `git clone` or by downloading a ZIP of the repository on GitHub.

### Installation

* In a terminal, go to the directory where the code is stored and run `npm install`.

### Run instructions

* Once the appropriate Node.js packages have been installed, start the application by running either `node app.js` or `npm start`.
* Open a browser and type `http://localhost:3000/login` in the address bar. From here, you can use one of the mock user accounts to navigate the application
  * `abray3`, `professor`
  * `cperez3`, `student`

### Troubleshooting

* If there is an error in starting the application, try running `npm i npm` to update npm and then running `npm install` to try installing the required packages again.
* Another common problem is pages not loading the correct information. For example, going from viewing one course's surveys to another course's surveys might still show the data from the previous one. If this happens, try refreshing the page.
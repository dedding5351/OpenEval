# OpenEval Web Application Delivery Documentation

## Release Notes

### New software features for this release

* Finished the base version of the application.

### Bug fixes made since the last release

* The search bar in `all-classes.html` now updates the class list automatically, without the user having to press a button to update the class list.
* The browser now displays a message when viewing. a class that has no active surveys and when viewing a survey that has no responses.

### Known bugs and defects

* Proper log in has not yet been implemented.
* The class list in `all-classes.html` currently shows the course ID in addition to the course number and course name.

* Students do not yet have the ability to post survey responses.
* Professors do not yet have the ability to register themselves for a course when looking at the course listing.
* Professors do not yet have the ability to create a new survey when looking at one of the courses they teach.

## Install Guide

### Prerequisites

* A terminal
* A web browser

### Dependent libraries

* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Download instructions

* The code for the web application can be found [here](https://github.com/dedding4341/OpenEval/tree/master/Web) and [here](https://github.com/davidherszenhaut/OpenEvalWebApplication).
* A copy of the code can be gotten by cloning the repository using `git clone` or by downloading a ZIP of the repository on GitHub.

### Installation

* In a terminal, go to the directory where the code is stored and run `npm install`.

### Run instructions

* Once the appropriate Node.js packages have been installed, start the application by running either `node app.js` or `npm start`.
* Open a browser and type `http://localhost:3000/login` in the address bar.

### Troubleshooting

* If there is an error in starting the application, try running `npm i npm` to update npm and then running `npm install` to try installing the required packages again.
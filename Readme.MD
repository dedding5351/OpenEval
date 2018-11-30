
iOS:
The features in the release are centered around two target users: professors and students. For professors, the application allows them register for a course, add a survey to the course that can then be seen by all of the students who are registered for the course and set a custom availability for when they want the survey to be administered. For students, the application can be used to view surveys released by the professor for a particular course and then submit a response to a survey based on its availability. There are currently no known bugs in the application but there are a lot of incomplete features that are not currently present in this release. On the professor side, these features include: reminder emails from professors to students, professors being able to view results of surveys, logging in as a professor, prepopulated registered courses, creating custom surveys and professors being able to export survey results. On the student side these features include: students being able to leave “check-ins” or small feedback forms that describe the difficulty of the course at a certain period of time at their own discretion, student login, student prepopulated registration of courses, and students being able to view data from previous check-ins. 

iOS Install Guide: 

Prerequisites:  To be able to run the application in the simulator on your computer or download it to your device you must first own or have access to an Apple computer. You then must have XCode installed on your Apple computer. XCode is the IDE used to make iOS and Mac apps. If it is not downloaded, then it may take a while to install on your computer based on your internet speeds. Once these actions have been completed all that is left to do is to download the project from GitHub. 

Dependent Libraries: There are no dependent third-party libraries that need to be installed for this portion of the application. 

Download Instructions: The project can be download in its most up to date state at https://github.com/m-gant/OpenEvaliOSApplication

Build Instructions: Do not apply to this portion of the application.

Installation Instructions: Do not apply to this portion of the application. 

Run Instructions: To build and run the application with a device simulator, you would first have to navigate to where the project was downloaded. Once you have done that, you would navigate to the .xcodeproj file and you could double-click that file and it would open the code for the application in XCode. Once you have the project opened you will see a play button in the top left corner of the window. You will also see a button with options for which device you would like to simulate the application on. Once you have chosen an appropriate device you can press the the play button and it will run the application in the simulator of your choosing. 

Troubleshooting: If you come across any issues while attempting to build and run the application feel free to contact Mitchell Gant via email at mgant6@gatech.edu. 

Web:
New software features for this release
- Finished the base version of the application:
- Rudimentary log in for students and professors
- Viewing a rudimentary list of all current courses
- View a user’s currently registered courses
- View the active surveys for a course
- View the survey responses (for professors)
- Submit survey responses (for students)

Bug fixes made since the last release
- The search bar in all-classes.html now updates the class list automatically, without the user having to press a button to update the class list.
- The browser now displays a message when viewing a class that has no active surveys and when viewing a survey that has no responses.

Web Install Guide:

Prerequisites:
•	A terminal
•	A web browser

Dependent libraries:
•	Node.js
•	npm

Download instructions: The code for the web application can be found here or here. A copy of the code can be gotten by cloning the repository using git clone or by downloading a ZIP of the repository on GitHub.

Installation Instructions: In a terminal, go to the directory where the code has been downloaded and run npm install.

Run Instructions: Once the appropriate Node.js packages have been installed, start the application by running either node app.js or npm start. Open a browser and type http://localhost:3000/login in the address bar. From here, use one of the mock user accounts to navigate the application
o	abray3, professor
o	cperez3, student

Troubleshooting: If there is an error in starting the application, try running npm i npm to update npm and then running npm install to try installing the required packages again. Another common problem is pages not loading the correct information. For example, going from viewing one course’s surveys to another course’s surveys might still show the data from the previous course. If this happens. try refreshing the page.


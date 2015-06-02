# eyehome-twitter

For the LIS EyeHome application.

# Setup

Software Needed
- Node.js
- npm (package installer)
- a browser

Installation
1) Navigate into eyehome-twitter, where you should find app.js
2) Run "npm install" to download all modules required

3) To run through Eyehome

- make sure Documents > eyehome > "twitter" exists
- edit the ahk file so that it is like so

Run, C://Program Files/nodejs/node.exe C://Users/UCSD/GitHub/eyehome-twitter/app.js
Sleep, 100
Run, chrome.exe -kiosk http://localhost:5000
Send, {F11}

and that the file locations are correct

3) To run independently:

npm start

and go to following URL in browser:
localhost:5000

Hit F11 to enter full screen mode.

# HOW TO ADD AN APP TO EYEHOME

This probably isn't the right place to put this

1. make physical folder in Documents > eyehome > “Test”
2. add a file “test” into folder for the scripts (can name anything, as long as its a ahk)
3. Open eyehome on visual studio and edit the menu.json to include the new application (use other examples in there as template)
4. Add an image to images/menu folder, same name as the ID from menu.json (needs to be png, ex. test.png)
5. Include new image to project with right click + “Include …”
6. if need be, in common.js, add one line of code:

localStorage.clear(); 

to “reload” the menu.json

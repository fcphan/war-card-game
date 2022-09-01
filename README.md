# A simple War card game
This project is a simple War card game running on a MERN stack (MongoDB, Express, React, Node.js).

## Installation
To run this project, you will need to download/clone the repo. Once that is done, you will need to navigate to both the `backend` and `frontend` folders and run `npm install` in order to install the dependencies listed in the `package.json` file.

### Set up database
After the both packages have been installed. You will need to navigate into the `backend` folder and create a `.env` file, and enter the following:
```
DATABASE_URL=<your-database-url-here>
```
Make sure to replace the `<your-database-url-here>` portion with the actual MongoDB database URL.

### Start application
Once that is done, while remaining in the `backend` folder, run the following to start the server:
```
npm run devStart
```
This will start the server and connect to the database.

Once connected to the database, open a new terminal and open the `frontend` folder. Enter the following to launch the web application:
```
npm start
```
The web app should now be up and running.
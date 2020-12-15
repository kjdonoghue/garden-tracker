<p align="center">
<img width="250" alt="Logo" src="./client/src/components/images/greenhouse.png"> 
</p>    


# <p align="center"><b>Garden Tracker | Full Stack Web App</b>


View the live version of Garden Tracker: http://garden-tracker-dc.surge.sh/</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Videos And Screenshots](#videos-and-screenshots)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Team Members](#team-members)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project
Garden Tracker was designed to assist gardeners in planning and organizing their gardens tasks, including tracking seed starting, planting, and harvest dates, as well as where the plants or seeds came from to make planning and purchasing for future years a breeze. 

The app also include growing guides about specific plants, and frost dates by zone - which can be identified by zip code - so that gardeners have all the information they need in one app.

Users can create multiple gardens, designate their primary garden, as well as add, edit, and delete plant information.


### Built With
Garden Tracker was built and deployed as a mobile-reponsive, full-stack web app. The frontend of the project was built using React, written in JavaScript and deployed on Surge. The backend of the project was created using Node and a PostgreSQL database to store user information and gardening guides, and was deployed on Heroku. The Phzmapi API was implimented to allow users to find their gardening zones by zip code. Login information is encryted and access to the website and database require JWT authorization.

Full List of Tools & Technologies:

* React
* Redux
* JavaScript
* Node
* Express
* Express-Sessions
* Pg-Promise
* PostgresSQL
* ElephantSQL
* Phzmapi API
* HTML
* CSS
* Material-UI
* bcryptjs
* JSON Web Tokens
* dotenv
* Heroku
* Surge 

## Videos and Screenshots

![](screenshots/garden-tracker.gif)

### Log In Page:
<img width="350" alt="Login" src="./screenshots/signin.png">

### Home:
<img width="350" alt="Home" src="./screenshots/home.png">

### Guides:
<img width="350" alt="Guides" src="./screenshots/guides.png">

### Zone Finder:
<img width="350" alt="Zone" src="./screenshots/zone.png">

### Gardens:
<img width="350" alt="Garden" src="./screenshots/garden-grid.png">

### Add a Plant:
<img width="350" alt="Add" src="./screenshots/add.png">

### Edit a Plant:
<img width="350" alt="Add" src="./screenshots/edit.png">

<!-- GETTING STARTED -->
## Creating Your Own Garden Tracker
### Getting Started
You can use Garden Tracker to create or modify your own gardening app, just fork the GitHub repository or clone it using the instructions below.

### Installation

1. Clone to local machine

git clone https://github.com/kjdonoghue/garden-tracker

2. Install NPM packages

    npm install bcryptjs<br>
    npm install dotenv<br>
    npm install express<br>
    npm install express-session<br>
    npm install mustache-express<br>
    npm install pg-promise<br>

3. Create a database

Use PostgresSQL or ElephantSQL to set up and connect to your own database.

<!-- CONTACT -->
## Created & Built By:
Kathryn Donoghue - https://github.com/kjdonoghue

Project Link: [https://github.com/kjdonoghue/garden-tracker](https://github.com/kjdonoghue/garden-tracker)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
  - Nathan Orris - **The Certified** [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)- **DiR at DigitalCrafts Houston** -
    [NathanNoSudo](https://github.com/NathanNoSudo)

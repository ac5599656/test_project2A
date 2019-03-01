# Beer Social App

## Overview

Beer Social App is a web application allowing users to share their beer
experiences.

Users sign up and log into the app to post about their beer experience. Once the user finished sharing
about their experience, the posts show their favorite bar linked to a map and their favorite beer.

The App also identifies the user and location.

To see a live demo, Please click [here](https://limitless-basin-10585.herokuapp.com/).

## Authors

- [Anne Chen](https://github.com/ac5599656)
- [Greg Mash](https://github.com/GregMash)
- [Bonnie Acuna](https://github.com/BonnieAcuna)

## Functionality

On the Front End, the app utilizes `jQuery`, `AJAX`, `HTML/CSS`, `Handlebars.js`,and `Moment.js`.
On the Back End, the app uses `Node.js` and `MySQL`. The app Node package utilizes `Sequelize` for database queries, `Express` for serving and routing, `Passport` for user authentication, and `bcrypt-nodejs` for hashing passwords.

`MySQL` stores all the users data and information.

## Cloning Down The Repo

If you wish to clone the app down to your computer...

1.  Use `MySQL Workbench` to create alcoholic_beverages_db.

    - The raw SQL query is CREATE DATABASE alcoholic_beverages_db.

2.  Inside the `config folder`, open up the `config.json` file:

    - In the development object, add your MySQL localhost password.

3.  In your terminal, cd into the project folder and run: -`npm install` to download all node.js dependencies.

4.  Finally, you can run the programming using: -`node server.js` in the terminal to start the node server.
    - And navigating to `localhost:3000` in your browser.

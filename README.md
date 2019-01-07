# Emissions-reaktor

This is a web application that shows users an interactive graph of CO2-emissions data.
You can find a live version of this application at: https://reaktor-emissions.herokuapp.com
It runs on a heroku container and uses free dynos so it's a bit slow.

## Technologies

I use MongoDB and mLab for the database. The server is written using NodeJS and I use Handlebars as a templating engine
for creating the HTML. Also use ExpressJS for creating and managing routes for the server.

On client side I use jQuery and ChartJS. jQuery for all kinds of interactive elements and AJAX. 
ChartJS for creating and updating the chart. Also Bootstrap is utilized for easier styling.

## Data

I used these open domain datafiles for my application.
  * Population data (CSV): http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv
  * Emissions data (CSV): http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv

I then used Javascript for parsing and insering the data to the database.

## Files

This section describes the basic functionality of each file.

  * 'app.js' Used as a starting point for the server. Also includes routing using the ExpressJS framework.
  * 'initializeDatabase.js' This file is used to create the database for the web application. Uses other files to connect and update the database. Loads and parses the data from the '/data' folder. 
  * '/api/api.js' Implements a basic API for the database. Called by AJAX from client side.
  * '/api/databaseConnection.js' Used by other files to talk to the database.
  * '/api/helpers.js' Some universal functions used by other files. Mainly formatting.
  * '/api/datamodel.json' JSON file describing the data model of the database. Each element of the database is like that.
  * '/data' This folder contains the datafiles used by 'initializeDatabase.js' for the initialization of the database.
  * '/static/css/styleMain.css' Styling for the page
  * '/static/js/scriptUI.js' Javascript file for handling the controls of the chart.
  * '/static/js/scriptUI2.js' Javascript file for updating the chart. Also connects to the API using AJAX.
  * '/views/layouts/main.handlebars' Basic layout used by 'home.handlebars'. Mainly futureproofing the site at this point.
  * '/views/home.handlebars' Actual HTML template for the homepage.

Libraries are also included in their respected '/static/' folders.

# Emissions-reaktor
This is a web application that shows users an interactive graph of CO2-emissions data. You can find a live version of this
application at: https://reaktor-emissions.herokuapp.com (It's a bit slow but works :D).

## Technologies
I use MongoDB and mLab for the database. The server is written using NodeJS and I use Handlebars as a templating engine
for creating the HTML.

On client side I use jQuery and ChartJS. jQuery for all kinds of interactive elements and AJAX and ChartJS for creating and updating the chart.

## Data
I used these open domain datafiles for my application.
Population data (CSV): http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv
Emissions data (CSV): http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv

I then used Javascript for parsing and insering the data to the database.

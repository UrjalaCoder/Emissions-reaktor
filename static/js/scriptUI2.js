'use strict';
const COLORS = ['rgba(145, 60, 205, 0.6)', 'rgba(241, 95, 116, 0.6)', 'rgba(247, 109, 60, 0.6)', 'rgba(44, 168, 194, 0.6)', 'rgba(152, 203, 74, 0.6)', 'rgba(84, 129, 230, 0.6)'];
var shownData = {};
var chart;
const CHART_OPTIONS = {
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: labelString
            },
            ticks: {
                beginAtZero: true
            }
        }]
    }
};
var emissionKey = "emissions";
var populationKey = "population";


// Updates the chart to reflect the shownData object -->
// Returns nothing.
function updatechart() {
    // If chart is not initialized, return.
    if(!chart) {
        return;
    }
    // Set datasets to empty list -->
    let newDatasets = [];
    for(let key in shownData) {
        // If key is a country -->
        if(shownData.hasOwnProperty(key)) {
            let data = [];
            shownData[key][emissionKey].forEach((element, index) => {
                if(!element) {
                    data.push(null);
                } else if(perCapita && !shownData[key][populationKey]) {
                    data.push(null);
                } else {
                    let point = element;
                    if(perCapita) {
                        point = element / shownData[key][populationKey][index];
                        console.log(point);
                    }
                    data.push(point);
                }
            });
            let formattedName = key.split("_").join(" ");
            newDatasets.push({
                label: `${formattedName} emissions`,
                data: data,
                borderColor: shownData[key]['color'],
                country: key
            });
        }

    }
    chart.data.datasets = newDatasets;


    let labelString = (perCapita) ? "CO2 Emissions per population" : "Total CO2 emissions";
    labelString += "(kt)";
    chart.options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: labelString
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    chart.update();
}

// Gets the data of a particular country by interacting with API.
function getData(country, callback) {
    $.ajax({
        url: `/data/${country}`
    }).done((data) => {
        data = JSON.parse(data);
        callback({
            [populationKey]: data['data']['population_data'],
            [emissionKey]: data['data']['emission_data']
        });
    });
}

function setYearlabels(start, end) {
    let yearLabels = [];
    for(let i = 0; i < (end - start + 1); i++) {
        yearLabels.push((start + i).toString());
    }
    chart.data.labels = yearLabels;
    chart.update();
}

function createchart() {
    let canvas = $('#chartCanvas');
    let currentYear = new Date().getFullYear();
    let yearLabels = [];
    for(var i = 0; i < (Number(currentYear) - 1960 + 1); i++) {
        yearLabels.push((1960 + i).toString());
    }

    let labelString = (perCapita) ? "CO2 Emissions per population" : "Total CO2 emissions";
    labelString += "(kt)";

    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: yearLabels,
            datasets: []
        },
        options: CHART_OPTIONS
    });
}

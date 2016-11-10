'use strict';

var PushAPI     = require('../Common/src/API/PushAPI.js');
var Death       = require('../Common/src/API/Data/Death.js');
var LoadoutData = require('../Common/src/API/Data/LoadoutData.js');

var totalCounter = document.getElementById('totalCounter');

var VSCounter = document.getElementById('VSCounter');
var NCCounter = document.getElementById('NCCounter');
var TRCounter = document.getElementById('TRCounter');

var VSDelta = document.getElementById('VSDelta');
var NCDelta = document.getElementById('NCDelta');
var TRDelta = document.getElementById('TRDelta');

var totalDeaths = 0;
var VSDeaths    = 0;
var NCDeaths    = 0;
var TRDeaths    = 0;
var VSDeltaVal  = 0;
var NCDeltaVal  = 0;
var TRDeltaVal  = 0;

var VSChart = [];
var NCChart = [];
var TRChart = [];

var chart;

window.onload = function() {
    chart = new CanvasJS.Chart("chartContainer",{
        title :{
            text: "Death Deltas by Faction"
        },
        data: [
            {
                type: "area",
                color: "rgba(128,0,128,.5)",
                dataPoints: VSChart
            },
            {
                type: "area",
                color: "rgba(0,0,255,.5)",
                dataPoints: NCChart
            },
            {
                type: "area",
                color: "rgba(255,0,0,.5)",
                dataPoints: TRChart
            }
        ]
    });
};

var xVal = 0;
var updateInterval = 100;
var dataLength = 200; // number of dataPoints visible at any point

var updateChart = function (count) {
    if(!chart) return;

    count = count || 1;
    // count is number of times loop runs to generate random dataPoints.

    for (var j = 0; j < count; j++) {
        VSChart.push({
            x: xVal,
            y: VSDeltaVal
        });
        NCChart.push({
            x: xVal,
            y: NCDeltaVal
        });
        TRChart.push({
            x: xVal,
            y: TRDeltaVal
        });
        xVal++;
    }
    if (VSChart.length > dataLength)
    {
        VSChart.shift();
    }
    if (NCChart.length > dataLength)
    {
        NCChart.shift();
    }
    if (TRChart.length > dataLength)
    {
        TRChart.shift();
    }

    chart.render();
};

// generates first set of dataPoints
updateChart(dataLength);

// update chart after specified time.
setInterval(function(){updateChart()}, updateInterval);

LoadoutData.startFetchLoadouts(startTrackingDeaths);

// Don't start tracking deaths until we've resolved loadouts (needed for
// faction display)
function startTrackingDeaths() {
    onDeathEvent(function (payload) {
        var death = new Death(
            payload.attacker_loadout_id,
            payload.character_loadout_id
        );

        totalDeaths++;
        totalCounter.innerHTML = totalDeaths;

        if(death.faction.id === 1) {
            VSDeaths++;
            VSCounter.innerHTML = VSDeaths;
        } else if (death.faction.id === 2) {
            NCDeaths++;
            NCCounter.innerHTML = NCDeaths;
        } else if (death.faction.id === 3) {
            TRDeaths++;
            TRCounter.innerHTML = TRDeaths;
        }

        updateDeltas();
    });
}

function updateDeltas() {
    var max = Math.max(VSDeaths, NCDeaths, TRDeaths);
    var avg = Math.round((VSDeaths + NCDeaths + TRDeaths)/3);
    var min = Math.min(VSDeaths, NCDeaths, TRDeaths);
    var deltaValue = 0;
    // VS
    if(VSDeaths <= TRDeaths && VSDeaths >= NCDeaths ||
       VSDeaths >= TRDeaths && VSDeaths <= NCDeaths) {
        deltaValue = VSDeaths >= avg ? VSDeaths - avg : avg - VSDeaths;
        VSDelta.innerHTML = avg >= 0 ? '+' + deltaValue : deltaValue;
        VSDeltaVal = deltaValue;
        VSDelta.className = 'mid';
    }
    if(VSDeaths >= TRDeaths && VSDeaths >= NCDeaths) {
        deltaValue  = VSDeaths - Math.max(NCDeaths, TRDeaths);
        VSDelta.innerHTML = '+' + deltaValue;
        VSDeltaVal = deltaValue;
        VSDelta.className = 'max';
    }
    if(VSDeaths <= TRDeaths && VSDeaths <= NCDeaths) {
        deltaValue = VSDeaths - Math.min(NCDeaths, TRDeaths);
        VSDelta.innerHTML = deltaValue;
        VSDeltaVal = deltaValue;
        VSDelta.className = 'min';
    }

    // NC
    if(NCDeaths <= TRDeaths && NCDeaths >= VSDeaths ||
       NCDeaths >= TRDeaths && NCDeaths <= VSDeaths) {
        deltaValue = NCDeaths >= avg ? NCDeaths - avg : avg - NCDeaths;
        NCDelta.innerHTML = avg >= 0 ? '+' + deltaValue : deltaValue;
        NCDeltaVal = deltaValue;
        NCDelta.className = 'mid';
    }
    if(NCDeaths >= TRDeaths && NCDeaths >= VSDeaths) {
        deltaValue = NCDeaths - Math.max(VSDeaths, TRDeaths);
        NCDelta.innerHTML = '+' + deltaValue;
        NCDeltaVal = deltaValue;
        NCDelta.className = 'max';
    }
    if(NCDeaths <= TRDeaths && NCDeaths <= VSDeaths) {
        deltaValue = NCDeaths - Math.min(VSDeaths, TRDeaths);
        NCDelta.innerHTML = deltaValue;
        NCDeltaVal = deltaValue;
        NCDelta.className = 'min';
    }

    // TR
    if(TRDeaths <= VSDeaths && TRDeaths >= NCDeaths ||
       TRDeaths >= VSDeaths && TRDeaths <= NCDeaths) {
        deltaValue = TRDeaths >= avg ? TRDeaths - avg : avg - TRDeaths;
        TRDelta.innerHTML = avg >= 0 ? '+' + deltaValue : deltaValue;
        TRDeltaVal = deltaValue;
        TRDelta.className = 'mid';
    }
    if(TRDeaths >= VSDeaths && TRDeaths >= NCDeaths) {
        deltaValue = TRDeaths - Math.max(VSDeaths, NCDeaths);
        TRDelta.innerHTML = '+' + deltaValue;
        TRDeltaVal = deltaValue;
        TRDelta.className = 'max';
    }
    if(TRDeaths <= VSDeaths && TRDeaths <= NCDeaths) {
        deltaValue = TRDeaths - Math.min(VSDeaths, NCDeaths);
        TRDelta.innerHTML = deltaValue;
        TRDeltaVal = deltaValue;
        TRDelta.className = 'min';
    }
}

function onDeathEvent(callback) {
    var pushQuery = getPushAPIQuery();
    PushAPI.connect((data) => {
        if(!data.payload) return;
        callback(data.payload);
    }, pushQuery);
}

// TODO: switch to using PushAPI.buildQuery
function getPushAPIQuery(){
    // Build up all the query parameters
    var service    = '"service":"event"';
    var action     = '"action":"subscribe"';
    var characters = '"characters":["all"]';
    var eventNames = '"eventNames":["Death"]';

    // Collect all the parameters
    var queryParams = [service, action, characters, eventNames];

    // Finalize the query
    return '{' + queryParams.join(',') + '}';
}
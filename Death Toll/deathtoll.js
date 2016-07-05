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
    var mid = 0;
    var min = Math.min(VSDeaths, NCDeaths, TRDeaths);
    
    // VS
    if(VSDeaths <= TRDeaths && VSDeaths >= NCDeaths ||
       VSDeaths >= TRDeaths && VSDeaths <= NCDeaths) {
        VSDelta.innerHTML = mid;
        VSDelta.className = 'mid';
    }
    if(VSDeaths >= TRDeaths && VSDeaths >= NCDeaths) {
        VSDelta.innerHTML = '+ ' + (VSDeaths - Math.max(NCDeaths, TRDeaths));
        VSDelta.className = 'max';
    }
    if(VSDeaths <= TRDeaths && VSDeaths <= NCDeaths) {
        VSDelta.innerHTML = VSDeaths - Math.min(NCDeaths, TRDeaths);
        VSDelta.className = 'min';
    }

    // NC
    if(NCDeaths <= TRDeaths && NCDeaths >= VSDeaths ||
       NCDeaths >= TRDeaths && NCDeaths <= VSDeaths) {
        NCDelta.innerHTML = mid;
        NCDelta.className = 'mid';
    }
    if(NCDeaths >= TRDeaths && NCDeaths >= VSDeaths) {
        NCDelta.innerHTML = '+ ' + (NCDeaths - Math.max(VSDeaths, TRDeaths));
        NCDelta.className = 'max';
    }
    if(NCDeaths <= TRDeaths && NCDeaths <= VSDeaths) {
        NCDelta.innerHTML = NCDeaths - Math.min(VSDeaths, TRDeaths);
        NCDelta.className = 'min';
    }

    // TR
    if(TRDeaths <= VSDeaths && TRDeaths >= NCDeaths ||
       TRDeaths >= VSDeaths && TRDeaths <= NCDeaths) {
        TRDelta.innerHTML = mid;
        TRDelta.className = 'mid';
    }
    if(TRDeaths >= VSDeaths && TRDeaths >= NCDeaths) {
        TRDelta.innerHTML = '+ ' + (TRDeaths - Math.max(VSDeaths, NCDeaths));
        TRDelta.className = 'max';
    }
    if(TRDeaths <= VSDeaths && TRDeaths <= NCDeaths) {
        TRDelta.innerHTML =  TRDeaths - Math.min(VSDeaths, NCDeaths);
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
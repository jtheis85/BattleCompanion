'use strict';

var PushAPI = require('../Common/src/API/PushAPI.js');

var deathCounterElementId = 'deathCounter';
var deathCounterElement = document.getElementById(deathCounterElementId);

var deathCount = 0;

onDeathEvent(function () {
    deathCount++;
    deathCounterElement.innerHTML = deathCount;
});

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
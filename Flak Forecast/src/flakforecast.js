'use strict';

var ReferenceData = require('./ReferenceData.js');
var RealTimeData  = require('./RealTimeData.js');
var Router        = require('./Router.js');
var World         = require('../../Common/src/API/Data/World.js');
var Zone          = require('../../Common/src/API/Data/Zone.js');
var Faction       = require('../../Common/src/API/Data/Faction.js');

var currentRoute;

ReferenceData.startFetchData(function() {

    Router.initialize(function(route) {
        currentRoute = route;
    });

    // Once the reference data is loaded, connect to the real-time API
    RealTimeData.connect(function(event) {
        //OnEvent
        // Don't filter if no route is set
        if (!currentRoute ||
            (currentRoute.worldId === event.world.id &&
             currentRoute.zoneId  === event.zone .id)) {

            appendMessage(event);
        }
    });

    function appendMessage(event) {
        var div = document.createElement('div');
        var text = document.createTextNode(buildString(event));
        div.appendChild(text);
        document.body.appendChild(div);
    }

    function buildString(event) {
        var displayPieces = [];

        displayPieces.push('Faction: ' + event.faction.abbreviation);
        displayPieces.push('World: '   + event.world.name);
        displayPieces.push('Zone: '    + event.zone .name);

        return displayPieces.join(' ');
    }
});


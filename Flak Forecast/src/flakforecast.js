'use strict';

var ReferenceData = require('./ReferenceData.js');
var RealTimeData  = require('./RealTimeData.js');
var World         = require('../../Common/src/API/Data/World.js');
var Zone          = require('../../Common/src/API/Data/Zone.js');
var Faction       = require('../../Common/src/API/Data/Faction.js');

ReferenceData.startFetchData(function() {
    // Once the reference data is loaded, connect to the real-time API
    RealTimeData.connect(function(event) {
        //OnEvent
        var div = document.createElement('div');
        var text = document.createTextNode(buildString(event));
        div.appendChild(text);
        document.body.appendChild(div);
    });

    function buildString(event) {
        var displayPieces = [];

        displayPieces.push('Faction: ' + event.faction.abbreviation);
        displayPieces.push('World: '   + event.world.name);
        displayPieces.push('Zone: '    + event.zone .name);

        return displayPieces.join(' ');
    }
});


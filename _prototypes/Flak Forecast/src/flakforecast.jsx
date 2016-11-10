'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import FlakForecastApp from './Components/FlakForecastApp.jsx';

var ReferenceData = require('./ReferenceData.js');
var RealTimeData  = require('./RealTimeData.js');
var Router        = require('./Router.js');
var World         = require('../../Common/src/API/Data/World.js');
var Zone          = require('../../Common/src/API/Data/Zone.js');
var Faction       = require('../../Common/src/API/Data/Faction.js');

var currentRoute;

ReferenceData.startFetchData(() => {

    Router.initialize(route => {
        currentRoute = route;
        ReactDOM.render(<FlakForecastApp route={currentRoute} worlds={ReferenceData.getWorlds()}/>, document.getElementById('main-nav'));
    });

    // Once the reference data is loaded, connect to the real-time API
    RealTimeData.connect(event => {
        //OnEvent
        // Don't filter if no route is set
        if (!currentRoute ||
            // Only filter on world if that's all that's set
            (currentRoute.worldId === event.world.id &&
                currentRoute.zoneId  === undefined) ||
            (currentRoute.worldId === event.world.id &&
                currentRoute.zoneId  === event.zone .id)) {

            appendMessage(event);
        }
    });

    function appendMessage(event) {
        var div = document.createElement('div');
        var text = document.createTextNode(buildString(event));
        div.appendChild(text);

        var messagesArea = document.getElementById('messages-area');
        messagesArea.appendChild(div);
    }

    function buildString(event) {
        var displayPieces = [];

        displayPieces.push('Faction: ' + event.faction.abbreviation);
        displayPieces.push('World: '   + event.world.name);
        displayPieces.push('Zone: '    + event.zone .name);

        return displayPieces.join(' ');
    }
});


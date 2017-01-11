'use strict';

import HashListener from './HashListener.js';

var onRouteChangeCallback;

const Router = {
    initialize: function (callback) {
        onRouteChangeCallback = callback;

        var initialHash = location.hash;
        processHash(initialHash);

        HashListener.initialize(processHash);
    }
};

function processHash(rawHash) {
    var route = parseHash(rawHash);
    onRouteChangeCallback(route);
}

function parseHash(rawHash) {
    if(rawHash) {
        const pieces = rawHash.substring(1).split('/');
        let server, faction, option;
        for(let i = 0; i < pieces.length; i+=2) {
            switch(pieces[i]) {
                case 's':
                    server = pieces[i+1];
                    break;
                case 'f':
                    faction = pieces[i+1];
                    break;
                case 'o':
                    option = pieces[i+1];
                    break;
            }
        }

        return {
            server:  server,
            faction: faction,
            option:  option
        }
    } else {
        return null;
    }
}

export default Router;
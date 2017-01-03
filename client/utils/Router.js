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
        var splitHash = rawHash.substring(1).split('/');
        return {
            server:  splitHash[0],
            faction: splitHash[1]
        }
    } else {
        return null;
    }
}

export default Router;
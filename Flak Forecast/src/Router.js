'use strict';

var HashListener = require('../../Common/src/Utilities/HashListener.js');

var onRouteChangeCallback;

var Router = {
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
            worldId: splitHash[0],
            zoneId:  splitHash[1]
        }
    } else {
        return null;
    }
}

module.exports = Router;
'use strict';

var serviceID = require('./service.js').getNamespacedID();

const censusDomain = 'https://census.daybreakgames.com';
const verb         = 'get';
const namespace    = 'ps2';
const version      = 'v2';

var Query = {
    APIURL: [censusDomain, serviceID, verb, namespace + ':' + version + '/'].join('/'),
    build: function(queryBody, callbackName) {
        return Query.APIURL + queryBody + '&callback=' + callbackName;
    }
};

module.exports = Query;
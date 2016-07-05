'use strict';

var serviceID = require('./Service.js').getNamespacedID();

const censusDomain = 'https://census.daybreakgames.com';
const verb         = 'get';
const namespace    = 'ps2';
const version      = 'v2';

var Query = {
    APIURL: [censusDomain, serviceID, verb, namespace + ':' + version + '/'].join('/')
};

module.exports = Query;
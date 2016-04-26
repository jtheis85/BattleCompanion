'use strict';

var serviceID = require('./Service.js').getNamespacedID();

var Query = {
    APIURL: 'http://census.soe.com/' + serviceID + '/get/ps2:v2/'
};

module.exports = Query;
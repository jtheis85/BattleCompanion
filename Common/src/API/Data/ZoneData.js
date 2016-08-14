'use strict';

var Zone  = require('./Zone');
var Query = require('../Query');
var JSONP = require('../../Utilities/JSONP.js');

var zonesLoadCallback;
// Don't use {}
var zoneDictionary = Object.create(null);

var ZoneData = {
    startFetchZoneData: function (callback) {
        var zonesQuery = Query.build('zone?c:limit=10', 'zonesLoad');
        JSONP.loadData(zonesQuery);
        zonesLoadCallback = callback;
    },
    getZones: function () {
        return zoneDictionary;
    },
    getZone: function(id) {
        return zoneDictionary[id];
    }
};

window.zonesLoad = function(data) {
    data.zone_list.forEach(function(zone){
        zoneDictionary[zone.zone_id] = new Zone(
            zone.zone_id,
            zone.name.en
        );
    });

    zonesLoadCallback(zoneDictionary);
};

module.exports = ZoneData;
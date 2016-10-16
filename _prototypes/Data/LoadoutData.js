'use strict';

// { loadout_list: [
//     {
//       loadout_id: "1",
//       profile_id: "2",
//       faction_id: "2",
//       code_name:  "NC Infiltrator"
//      }
//    ],
//    returned: 1 }

var Loadout = require('./Loadout.js');
var Query   = require('../Query.js');
var JSONP   = require('../../Utilities/JSONP.js');

var loadoutsLoadCallback;
// Use instead of an object literal (e.g. {} ). An object literal has Object.prototype as its prototype, looking up a
// string key that happens to be a method on Object.prototype will return the method unexpectedly
// Passing null to Object.create explicitly sets the prototype to null
// See http://ryanmorr.com/true-hash-maps-in-javascript/ for more
var loadoutDictionary = Object.create(null);

var LoadoutData = {
    startFetchLoadouts: function (callback) {
        var loadoutsQuery = getLoadoutsQuery();
        JSONP.loadData(loadoutsQuery);
        loadoutsLoadCallback = callback;
    },
    getLoadouts: function() {
        return loadoutDictionary;
    },
    getLoadout: function(id) {
        return loadoutDictionary[id];
    }
};

function getLoadoutsQuery() {
    var callbackString = '&callback=loadoutsLoad';
    var queryBody = 'loadout?c:limit=100';
    return Query.APIURL + queryBody + callbackString;
}

window.loadoutsLoad = function (data) {

    data.loadout_list.forEach(function(loadout) {
        loadoutDictionary[loadout.loadout_id] = new Loadout(
            loadout.loadout_id,
            loadout.faction_id,
            loadout.code_name
        );
    });

    loadoutsLoadCallback(loadoutDictionary);
};

module.exports = LoadoutData;
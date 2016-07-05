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
var loadoutList = [];

var LoadoutData = {
    startFetchLoadouts: function (callback) {
        var loadoutsQuery = getLoadoutsQuery();
        JSONP.loadData(loadoutsQuery);
        loadoutsLoadCallback = callback;
    },
    getLoadouts: function() {
        return loadoutList;
    },
    getLoadout: function(id) {
        // TODO: Switch to storing in an object by loadout ID for better perf
        return loadoutList.filter(function(loadout) {
            return loadout.id === id;
        })[0];
    }
};

function getLoadoutsQuery() {
    var callbackString = '&callback=loadoutsLoad';
    var queryBody = 'loadout?c:limit=100';
    return Query.APIURL + queryBody + callbackString;
}

window.loadoutsLoad = function (data) {
    var loadouts = data.loadout_list.map(function(loadout) {
        return new Loadout(
            loadout.loadout_id,
            loadout.faction_id,
            loadout.code_name
        );
    });

    loadoutList = loadouts;

    loadoutsLoadCallback(loadouts);
};

module.exports = LoadoutData;
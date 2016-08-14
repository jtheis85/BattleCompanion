// Ensures that all data types that are referenced are resolved before
// being used.

'use strict';

var WorldData   = require('../../Common/src/API/Data/WorldData.js');
var ZoneData    = require('../../Common/src/API/Data/ZoneData.js');
var FactionData = require('../../Common/src/API/Data/FactionData.js');
var LoadoutData = require('../../Common/src/API/Data/LoadoutData.js');

var initializeCallback;

// Don't use {}
var worlds   = Object.create(null);
var zones    = Object.create(null);
var loadouts = Object.create(null);
var factions = FactionData;

var ReferenceData = {
    startFetchData: function(callback) {
        WorldData.startFetchWorlds(function (worldDictionary) {
            worlds = worldDictionary;
            if (isDataLoaded()) {
                callback();
            }
        });
        ZoneData.startFetchZoneData(function(zoneDictionary) {
            zones = zoneDictionary;
            if (isDataLoaded()) {
                callback();
            }
        });
        LoadoutData.startFetchLoadouts(function(loadoutDictionary) {
            loadouts = loadoutDictionary;
            if(isDataLoaded()) {
                callback();
            }
        });

        initializeCallback = callback;
    },
    lookupWorld: function(worldId) {
        return worlds[worldId];
    },
    lookupZone: function(zoneId) {
        return zones[zoneId];
    }
};

function isDataLoaded() {
    if (worlds && zones && factions && loadouts) {
        return true;
    } else return false;
}

module.exports = ReferenceData;
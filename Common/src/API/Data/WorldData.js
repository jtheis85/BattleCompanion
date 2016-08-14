'use strict';

var World = require('./World.js');
var Query = require('../Query.js');
var JSONP = require('../../Utilities/JSONP.js');

var worldsLoadCallback;
// Don't use {}, make sure the prototype is null
var worldDictionary = Object.create(null);

var WorldData = {
    startFetchWorlds: function(callback) {
        var worldsQuery = Query.build('world?c:limit=20', 'worldsLoad');
        JSONP.loadData(worldsQuery);
        worldsLoadCallback = callback;
    },
    getWorlds: function() {
        return worldDictionary;
    },
    getWorld: function(id) {
        return worldDictionary[id];
    }
};

window.worldsLoad = function (data) {

    data.world_list.forEach(function(world) {
        worldDictionary[world.world_id] = new World(
            world.world_id,
            world.name.en
        );
    });

    worldsLoadCallback(worldDictionary);
};

module.exports = WorldData;
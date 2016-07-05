'use strict';

var Faction     = require('./Faction.js');
var FactionData = require('./FactionData.js');

var Loadout = function(loadoutId, factionId, name) {
    this.id          = loadoutId;
    this.faction     = FactionData.filter(function(faction) {
        // CAREFUL! Type coercion going on here
        return faction.id == factionId;
    })[0];
    this.loadoutName = name;
};

module.exports = Loadout;
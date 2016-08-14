'use strict';

var LoadoutData = require('./LoadoutData.js');
var FactionData = require('./FactionData.js');
var WorldData   = require('./WorldData.js');
var ZoneData    = require('./ZoneData.js');

// "GainExperience":{
//     "amount":"20",
//     "character_id":"5428010917254577777",
//     "event_name":"GainExperience",
//     "experience_id":"288",
//     "loadout_id":"6",
//     "other_id":"8763865826",
//     "timestamp":"1470190288",
//     "world_id":"17",
//     "zone_id":"2"
// }

var GainExperience = function(loadoutId, worldId, zoneId) {
    if(loadoutId) {
        var loadout = LoadoutData.getLoadout(loadoutId);
        if(loadout) {
            this.faction = loadout.faction;
        } else {
            this.faction = undefined;
        }
    } else {
        this.faction = undefined;
    }

    this.world = WorldData.getWorld(worldId);
    this.zone  = ZoneData.getZone(zoneId);
};

module.exports = GainExperience;
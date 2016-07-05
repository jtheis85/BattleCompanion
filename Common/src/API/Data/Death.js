// DeathInfo

'use strict';

var LoadoutData = require('./LoadoutData.js');
var FactionData = require('./FactionData.js');

// API Object
// "Death":{
//     "attacker_character_id":"",
//     "attacker_fire_mode_id":"",
//     "attacker_loadout_id":"",
//     "attacker_vehicle_id":"",
//     "attacker_weapon_id":"",
//     "character_id":"",
//     "character_loadout_id":"",
//     "event_name":"Death",
//     "is_critical":"",
//     "is_headshot":"",
//     "timestamp":"",
//     "vehicle_id":"",
//     "world_id":"",
//     "zone_id":""
// },

var Death = function(attackerLoadoutId, loadoutId) {
    this.attackerFaction = LoadoutData.getLoadout(attackerLoadoutId).faction;
    this.faction         = LoadoutData.getLoadout(loadoutId)        .faction;
};

module.exports = Death;
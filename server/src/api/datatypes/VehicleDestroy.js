'use strict';

// "VehicleDestroy":{
//     "attacker_character_id":"",
//     "attacker_loadout_id":"",
//     "attacker_vehicle_id":"",
//     "attacker_weapon_id":"",
//     "character_id":"",
//     "event_name":"VehicleDestroy",
//     "facility_id":"",
//     "faction_id":"",
//     "timestamp":"",
//     "vehicle_id":"",
//     "world_id":"",
//     "zone_id":""
// }

class VehicleDestroy {
    constructor(
        attackerFaction,
        attackerWeapon,
        attackerVehicle,
        victimFaction,
        victimVehicle,
        timestamp,
        world,
        zone
    ) {
        this.attackerFaction = attackerFaction;
        this.attackerVehicle = attackerVehicle;
        this.attackerWeapon  = attackerWeapon;
        this.victimFaction   = victimFaction;
        this.victimVehicle   = victimVehicle;
        this.timestamp       = timestamp;
        this.world           = world;
        this.zone            = zone;
    }
}

export default VehicleDestroy;
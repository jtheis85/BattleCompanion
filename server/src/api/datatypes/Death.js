'use strict';

class Death {
    constructor(
        attackerFaction,
        attackerVehicle,
        attackerWeapon,
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

export default Death;
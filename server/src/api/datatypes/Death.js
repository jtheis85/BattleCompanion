'use strict';

class Death {
    constructor(
        attackerLoadout,
        attackerWeapon,
        attackerVehicle,
        victimLoadout,
        timestamp,
        world,
        zone
    ) {
        this.attackerLoadout = attackerLoadout;
        this.attackerWeapon  = attackerWeapon;
        this.attackerVehicle = attackerVehicle;
        this.victimLoadout   = victimLoadout;
        this.timestamp       = timestamp;
        this.world           = world;
        this.zone            = zone;
    }
}

export default Death;
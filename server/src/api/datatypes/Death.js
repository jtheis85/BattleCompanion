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
    getDomain() {
        return this.attackerWeapon ? this.attackerWeapon.domain : 'none';
    }
    getVictimVehicleDomain() {
        return this.victimVehicle ? this.victimVehicle.domain : 'none';
    }
    print() {

        const deathType = this.victimVehicle
            ? 'vehicle death'
            : 'character death';

        const attackingFaction = this.attackerFaction ? this.attackerFaction.abbreviation : 'None';
        const victimFaction    = this.victimFaction   ? this.victimFaction.abbreviation : 'None';
        const worldName        = this.world           ? this.world.name : 'unknown';
        const zoneName         = this.zone            ? this.zone.name : 'unknown';
        const weaponDomain     = this.attackerWeapon  ? this.attackerWeapon.domain : 'none';
        const weaponCategory   = this.attackerWeapon  ? this.attackerWeapon.category : 'none';
        const victimVehicle    = this.victimVehicle   ? this.victimVehicle.domain : 'none';

        console.log({
            type:          deathType,
            factions:      `${attackingFaction} -> ${victimFaction}`,
            domain:        weaponDomain,
            category:      weaponCategory,
            victimVehicle: victimVehicle,
            time:          new Date(this.timestamp * 1000),
            location:      `${worldName} - ${zoneName}`
        })
    }
}

export default Death;
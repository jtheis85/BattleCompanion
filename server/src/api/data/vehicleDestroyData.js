'use strict';

import wsApi          from '../wsApi.js';
import { subscribe }  from '../WsApiSubscription.js';
import Death          from '../datatypes/Death.js';

import loadoutData from '../data/loadoutData.js';
import worldData   from '../data/worldData.js';
import vehicleData from '../data/vehicleData.js';
import weaponData  from '../data/weaponData.js';
import zoneData    from '../data/zoneData.js';

const vehicleDestroyData = {
    trackVehicleDestruction() {
        const subscription = {
            ...subscribe,
            worlds: ['17'],
            characters: ['all'],
            eventNames: ['VehicleDestroy']
        };
        wsApi.subscribe(subscription, onDataReceived);
    }
};

function onDataReceived(data) {
    const death = toDeath(data);
    if(death) {
        const weapon = death.attackerWeapon;
        const weaponDomain = weapon ? weapon.domain : 'Unknown';
        const weaponCategory = weapon ? weapon.category : 'Unknown';

        const attackingFaction = death.attackerFaction ? death.attackerFaction.abbreviation : 'None';
        const victimFaction    = death.victimFaction   ? death.victimFaction.abbreviation : 'None';

        const attacker = death.attackerVehicle
            ? death.attackerVehicle.domain
            : death.attackerWeapon
                ? death.attackerWeapon.category
                : 'Unknown';
        const victim = death.victimVehicle
            ? death.victimVehicle.domain
            : 'None';

        const worldName = death.world ? death.world.name : 'unknown';
        const zoneName  = death.zone  ? death.zone.name : 'unknown';

        console.log({
            type:          'vehicle death',
            factions:      `${attackingFaction} -> ${victimFaction}`,
            domain:        weaponDomain,
            category:      weaponCategory,
            victimVehicle: victim,
            time:          death.timestamp,
            location:      `${worldName} - ${zoneName}`
        });
    }
}

function toDeath(data) {

    const attackerLoadout = loadoutData.getLoadout(data.attacker_loadout_id);
    const attackerFaction = attackerLoadout
        ? attackerLoadout.faction : null;

    const victimLoadout = loadoutData.getLoadout(data.loadout_id);
    const victimFaction = victimLoadout
        ? victimLoadout.faction : null;

    return new Death(
        attackerFaction,
        vehicleData.getVehicle(data.attacker_vehicle_id),
        weaponData.getWeapon(data.attacker_weapon_id),
        victimFaction,
        vehicleData.getVehicle(data.vehicle_id),
        data.timestamp,
        worldData.getWorld(data.world_id),
        zoneData.getZone(data.zone_id)
    );
}

export default vehicleDestroyData;
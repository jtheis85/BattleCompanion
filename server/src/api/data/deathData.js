'use strict';

import wsApi              from '../wsApi.js';
import { subscribe }      from '../WsApiSubscription.js';
import Death              from '../datatypes/Death.js';

import loadoutData from '../data/loadoutData.js';
import factionData from '../data/factionData.js';
import worldData   from '../data/worldData.js';
import vehicleData from '../data/vehicleData.js';
import weaponData  from '../data/weaponData.js';
import zoneData    from '../data/zoneData.js';

const deaths = [];

const deathData = {
    trackDeaths() {
        const deathSub = {
            ...subscribe,
            // NOTE! currently the api seems to ignore specifying the world when characters is specified as all.
            worlds: ['17'],
            characters: ['all'],
            eventNames: ['Death']
        };
        wsApi.subscribe(deathSub, onDataReceived);
        expireDeathsOverTime({
            checkIntervalSeconds: 5,
            expirationMinutes: 1
        });
    },
    getDeaths() {
        return deaths;
    }
};

function onDataReceived(data) {
    const death = toDeath(data);

    // There's a distinction between a "death" from the API's perspective
    // and the app's perspective. It might make sense to distinguish them.
    // Or maybe the API object should only be the 'data' and 'toDeath'
    // should handle the transform to the app's version

    const weapon = death.attackerWeapon;
    if(weapon && weapon.category) {

        const attackingFaction = death.attackerFaction ?  death.attackerFaction.abbreviation : 'None';
        const victimFaction    = death.victimFaction ? death.victimFaction.abbreviation : 'None';
        const worldName        = death.world ? death.world.name : 'unknown';
        const zoneName         = death.zone  ? death.zone.name : 'unknown';

        deaths.push({
            type:     'character death',
            factions: `${attackingFaction} -> ${victimFaction}`,
            domain:   weapon.domain,
            category: weapon.category,
            time:     new Date(death.timestamp * 1000),
            location: `${worldName} - ${zoneName}`
        });
    }
}

function expireDeathsOverTime({
        checkIntervalSeconds,
        expirationMinutes
    }) {

    setInterval(() => {
        // Look through the array starting with the oldest item
        for(;;) {
            if(deaths.length < 1) break;
            const time = deaths[0].time;

            if (time < (Date.now() - expirationMinutes * 30000)) { // to milliseconds
                // Remove the first item and checks the next
                deaths.splice(0, 1);
            } else {
                // Stop looking for now. Will be called again later.
                break;
            }
        }
    }, checkIntervalSeconds * 1000); // to milliseconds

}

function toDeath(data) {

    // Pull data out of the API object
    const attackerLoadout = loadoutData.getLoadout(data.attacker_loadout_id);
    const attackerVehicle = vehicleData.getVehicle(data.attacker_vehicle_id);
    const attackerWeapon  = weaponData .getWeapon(data.attacker_weapon_id);
    const victimLoadout   = loadoutData.getLoadout(data.character_loadout_id);
    const world           = worldData  .getWorld(data.world_id);
    const zone            = zoneData   .getZone(data.zone_id);
    const timestamp       = data.timestamp;

    // Vehicle destruction is handled elsewhere
    const victimVehicle = null;

    // Protect against referencing undefined properties
    // e.g. no attacker (suicide)
    const attackerFaction = attackerLoadout ? attackerLoadout.faction : null;
    const victimFaction   = victimLoadout ? victimLoadout.faction : null;

    return new Death(
        attackerFaction,
        attackerVehicle,
        attackerWeapon,
        victimFaction,
        victimVehicle,
        timestamp,
        world,
        zone
    )
}

export default deathData;
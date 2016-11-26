'use strict';

import wsApi              from '../wsApi.js';
import { subscribe }      from '../WsApiSubscription.js';
import Death              from '../datatypes/Death.js';
import { weaponCategory } from '../datatypes/Weapon.js';

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
        setInterval(expireDeaths, 5000);
    }
};

function onDataReceived(data) {
    const death = toDeath(data);
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
        console.log(`Deaths: ${deaths.length}`);
    }
}

function expireDeaths() {
    if(deaths.length < 1) return;
    // Look through the array starting with the oldest item
    for(;;) {
        const time = deaths[0].time;

        // Keep 30 sec worth of data in the queue
        if (time < (Date.now() - 30000)) {
            // Remove the first item and checks the next
            deaths.splice(0, 1);
        } else {
            // Stop looking for now. Will be called again later.
            break;
        }
    }
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
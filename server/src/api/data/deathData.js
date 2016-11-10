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

const deathData = {
    trackDeaths() {
        wsApi.connect(() => {
            const deathSub = {
                ...subscribe,
                // NOTE! currently the api seems to ignore specifying the world when characters is specified as all.
                worlds: ['17'],
                characters: ['all'],
                eventNames: ['Death']
            };
            wsApi.subscribe(deathSub, (data) => {
                if(!data.payload) return;
                const death = toDeath(data);
                if(death.attackerWeapon &&
                    death.attackerWeapon.category
                    && death.attackerWeapon.category !== weaponCategory.infSmallArms) {

                    const attackingFaction = death.attackerLoadout.faction.abbreviation;
                    const victimFaction = death.victimLoadout.faction.abbreviation;
                    const worldName = death.world ? death.world.name : 'unknown';
                    const zoneName  = death.zone  ? death.zone.name : 'unknown';

                    console.log({
                        factions: `${attackingFaction} -> ${victimFaction}`,
                        domain:   death.attackerWeapon.domain,
                        category: death.attackerWeapon.category,
                        time:     death.timestamp,
                        location: `${worldName} - ${zoneName}`
                    });
                }
            });
        });
    }
};

function toDeath(apiObject) {
    const data = apiObject.payload;
    return new Death(
        loadoutData.getLoadout(data.attacker_loadout_id),
        weaponData.getWeapon(data.attacker_weapon_id),
        vehicleData.getVehicle(data.attacker_vehicle_id),
        loadoutData.getLoadout(data.character_loadout_id),
        data.timestamp,
        worldData.getWorld(data.world_id),
        zoneData.getZone(data.zone_id)
    )
}

export default deathData;
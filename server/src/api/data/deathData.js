'use strict';

import wsApi         from '../wsApi.js';
import { subscribe } from '../WsApiSubscription.js';
import Death         from '../datatypes/Death.js';

import loadoutData from '../data/loadoutData.js';
import factionData from '../data/factionData.js';
import zoneData    from '../data/zoneData.js';
import worldData   from '../data/worldData.js';

const deathData = {
    trackDeaths() {
        wsApi.connect(() => {
            const deathSub = {
                ...subscribe,
                worlds: ['17'],
                characters: ['all'],
                eventNames: ['Death']
            };
            console.log(deathSub);
            wsApi.subscribe(deathSub, (data) => {
                if(!data.payload) return;
                const death = toDeath(data);
                console.log(toDeath(data));
            });
        });
    }
};

function toDeath(apiObject) {
    const data = apiObject.payload;
    return new Death(
        loadoutData.getLoadout(data.attacker_loadout_id),
        data.attacker_weapon_id,
        data.attacker_vehicle_id,
        loadoutData.getLoadout(data.character_loadout_id),
        data.timestamp,
        worldData.getWorld(data.world_id),
        zoneData.getZone(data.zone_id)
    )
}

export default deathData;
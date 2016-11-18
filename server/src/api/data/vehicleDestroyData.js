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
        wsApi.connect(onConnect);
    }
};

function onConnect() {
    const subscription = {
        ...subscribe,
        worlds: ['17'],
        characters: ['all'],
        eventNames: ['VehicleDestroy']
    };
    wsApi.subscribe(subscription, onDataReceived);
}

function onDataReceived(data) {
    if(!data.payload) return;
    const death = toDeath(data);
    if(death) {
        let attacker = death.attackerVehicle
            ? death.attackerVehicle.domain
            : death.attackerWeapon
                ? death.attackerWeapon.category
                : 'Unknown';
        let victim = death.victimVehicle
            ? death.victimVehicle.domain
            : 'None';
        console.log(`${attacker} -> ${victim}`);
        if(victim === 'None') {
            console.log(data);
        }
    }

}

function toDeath(apiObject) {
    const data = apiObject.payload;

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
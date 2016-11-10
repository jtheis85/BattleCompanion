'use strict';

import wsApi          from '../wsApi.js';
import { subscribe }  from '../WsApiSubscription.js';
import VehicleDestroy from '../datatypes/VehicleDestroy.js';

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
    const vehicleDestroy = toVehicleDestroy(data);
    if(vehicleDestroy) {
        console.log(vehicleDestroy);
    }

}

function toVehicleDestroy(apiObject) {
    const data = apiObject.payload;
    return new VehicleDestroy(
        loadoutData.getLoadout(data.attacker_loadout_id).faction,
        weaponData.getWeapon(data.attacker_weapon_id),
        vehicleData.getVehicle(data.attacker_vehicle_id),
        loadoutData.getLoadout(data.attacker_loadout_id).faction,
        vehicleData.getVehicle(data.vehicle_id),
        data.timestamp,
        worldData.getWorld(data.world_id),
        zoneData.getZone(data.zone_id)
    );
}

export default vehicleDestroyData;
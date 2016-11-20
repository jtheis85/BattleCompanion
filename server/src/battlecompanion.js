'use strict';

import wsApi from './api/wsApi.js';

import deathData          from './api/data/deathData.js';
import vehicleDestroyData from './api/data/vehicleDestroyData.js';
import loadoutData        from './api/data/loadoutData.js';
import vehicleData        from './api/data/vehicleData.js';
import weaponData         from './api/data/weaponData.js';
import worldData          from './api/data/worldData.js';
import zoneData           from './api/data/zoneData.js';

weaponData.startFetchWeapons(weapons => dataReceived());
worldData.startFetchWorlds(worlds => dataReceived());
zoneData.startFetchZones(zones => dataReceived());
loadoutData.startFetchLoadouts(loadouts => dataReceived());
vehicleData.startFetchVehicles(vehicles => dataReceived());

let dataCount = 0;
function dataReceived() {
    dataCount++;
    if (dataCount < 5) {
        console.log('Data received...');
        return;
    }
    wsApi.connect(() => {
        vehicleDestroyData.trackVehicleDestruction();
        deathData.trackDeaths();
    });
}
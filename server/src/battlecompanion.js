'use strict';

import deathData   from './api/data/deathData.js';
import loadoutData from './api/data/loadoutData.js';
import vehicleData from './api/data/vehicleData.js';
import weaponData  from './api/data/weaponData.js';
import worldData   from './api/data/worldData.js';
import zoneData    from './api/data/zoneData.js';

weaponData.startFetchWeapons(weapons => {});

//worldData.startFetchWorlds(worlds => dataReceived());
//zoneData.startFetchZones(zones => dataReceived());
//loadoutData.startFetchLoadouts(loadouts => dataReceived());
//vehicleData.startFetchVehicles(vehicles => dataReceived());
//
//let dataCount = 0;
//function dataReceived() {
//    dataCount++;
//    if (dataCount < 4) return;
//
//    deathData.trackDeaths();
//}
'use strict';

import deathData from './api/data/deathData.js';
import loadoutData from './api/data/loadoutData.js';
import zoneData    from './api/data/zoneData.js';
import worldData   from './api/data/worldData.js';

loadoutData.startFetchLoadouts(loadouts => dataReceived());
zoneData.startFetchZones(zones => dataReceived());
worldData.startFetchWorlds(worlds => dataReceived());

let dataCount = 0;
function dataReceived() {
    console.log(loadoutData.getLoadouts());
    console.log(zoneData.getZones());
    console.log(worldData.getWorlds());
    dataCount++;
    if (dataCount < 3) return;

    deathData.trackDeaths();
}
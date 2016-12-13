'use strict';


import aggregator from './aggregator.js';

import wsApi from './api/wsApi.js';
import analyze from './analyze.js';

import factionData        from './api/data/factionData.js';
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

    let worlds = [];
    let zones = [];
    let factions = [];
    for(let key in worldData.getWorlds()) {
        worlds.push(worldData.getWorlds()[key]);
    }
    for(let key in zoneData.getZones()) {
        const zone = zoneData.getZones()[key];
        if (parseInt(zone.id) > 10) continue; // Ignore non-live zones
        zones.push(zone);
    }
    for(let key in factionData) {
        factions.push(factionData[key]);
    }

    //aggregator.initialize(worlds, zones, factions);
    //console.log(aggregator.get());


    console.log('Connecting to API');
    wsApi.connect(() => {
        vehicleDestroyData.trackVehicleDestruction();
        deathData.trackDeaths();
    });

    console.log('Initializing...')
    // should this be inside the connect callback?
    analyze.initialize();
}
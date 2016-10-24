'use strict';

import wsApi from './api/wsApi.js';
import { subscribe } from './api/WsApiSubscription.js';

//wsApi.connect(() => {
//    let playerLoginSub = {
//        ...subscribe,
//        worlds: [17],
//        characters: ['all'],
//        eventNames: ['Death']
//    };
//    wsApi.subscribe(playerLoginSub, (data) => {
//        console.log(data);
//    });
//});

import restApi from './api/restApi.js';
import { RestApiQuery } from './api/restApi.js';


//let characterQuery = new RestApiQuery('character');
//restApi.get(characterQuery.url, (data) => {
//    console.log(data);
//});

import loadoutData from './api/data/loadoutData.js';
import factionData from './api/data/factionData.js';
import zoneData    from './api/data/zoneData.js';
import worldData   from './api/data/worldData.js';

zoneData.startFetchZones(zones => console.log(zones));
worldData.startFetchWorlds(worlds => console.log(worlds));
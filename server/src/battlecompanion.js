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

loadoutData.startFetchLoadouts((loadouts) => {
    for(let loadoutId in loadouts) {
        console.log(loadouts[loadoutId].name);
    }
});
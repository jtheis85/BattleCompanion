'use strict';

import wsApi from './API/wsApi.js';
import WsApiSubscription from './API/WsApiSubscription.js';

wsApi.connect(() => {
    let playerLoginSub = new WsApiSubscription(
        [1],
        null,
        ['PlayerLogin', 'PlayerLogout']
    );
    wsApi.subscribe(playerLoginSub, (data) => {
        console.log(data);
    });
});
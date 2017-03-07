'use strict';

import WebSocket from 'ws';

var ws;
var subs = {};

const wsApi = {
    connect(readyCallback) {
        initializeConnection(readyCallback);
    },
    subscribe(subscription, eventReceivedCallback) {
        subscribe(subscription, eventReceivedCallback);
    },
    disconnect(completedCallback) {
        dropConnection(completedCallback);
    }
};

function initializeConnection(readyCallback) {
    const urlBase     = 'wss://push.planetside2.com/streaming';
    const environment = 'environment=ps2';
    const serviceID   = 'service-id=s:Sq7FtUG1mfsn';

    const url = `${urlBase}?${environment}&${serviceID}`;

    ws = new WebSocket(url);
    ws.onopen = () => {
        readyCallback();

        ws.onmessage = (e) => {
            var data = JSON.parse(e.data);
            if(!data.payload) return;
            const eventName = data.payload.event_name;
            if(subs.hasOwnProperty(eventName)) {
                // Call the appropriate subscription callback
                subs[eventName](data.payload);
            }
        };


    };
    // TODO: Not sure this does what I think it does.
    // It's kind of squirrely to test since the DBG API must be down
    ws.onerror = (e) => {
        console.log(`ERROR: ${e}`);
    }
}

function subscribe(subscription, eventReceivedCallback) {
    ws.send(JSON.stringify(subscription));
    // Keep track of the subscription's callback, keyed by eventName
    subs[subscription.eventNames[0]] = eventReceivedCallback;
}

function dropConnection(completedCallback) {
    ws.close();
    ws.onclose = () => {
        completedCallback();
    }
}

export default wsApi;
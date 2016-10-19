'use strict';

import WebSocket from 'ws';

var ws;

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
    };
}

function subscribe(subscription, eventReceivedCallback) {
    ws.send(JSON.stringify(subscription));
    ws.onmessage = (e) => {
        eventReceivedCallback(JSON.parse(e.data));
    }
}

function dropConnection(completedCallback) {
    ws.close();
    ws.onclose = () => {
        completedCallback();
    }
}

export default wsApi;
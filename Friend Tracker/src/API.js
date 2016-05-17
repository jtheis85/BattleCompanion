"use strict";

const API = {
    connect: (onMessageCallback, query) => {
        const url = "wss://push.planetside2.com/streaming?environment=ps2&service-id=s:Sq7FtUG1mfsn";
        var ws = new WebSocket(url);
        ws.onopen = () => {
            ws.send(query);
        };
        ws.onclose = () => {

        };
        ws.onmessage = (e) => {
            onMessageCallback(JSON.parse(e.data));
        };
        ws.onerror = () => {

        };
    }
};

module.exports = API;


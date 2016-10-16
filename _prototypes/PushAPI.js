"use strict";

const PushAPI = {
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
    },
    buildQuery: (eventNamesArray, charactersArray) => {
        var charactersString;
        if(charactersArray && charactersArray.length > 0) {
            charactersString = charactersArray.join('","');
        } else {
            charactersString = 'all';
        }

        // Build up all the query parameters
        var service    = '"service":"event"';
        var action     = '"action":"subscribe"';
        var characters = '"characters":["'+ charactersString +'"]';
        var eventNames = '"eventNames":["'+ eventNamesArray.join('","') +'"]';

        // Collect all the parameters
        var queryParams = [service, action, characters, eventNames];

        // Finalize the query
        return '{' + queryParams.join(',') + '}';
    }
};

module.exports = PushAPI;


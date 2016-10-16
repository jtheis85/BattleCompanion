'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws;

var wsApi = {
    connect: function connect(readyCallback) {
        initializeConnection(readyCallback);
    },
    subscribe: function subscribe(subscription, eventReceivedCallback) {
        _subscribe(subscription, eventReceivedCallback);
    },
    disconnect: function disconnect(completedCallback) {
        dropConnection(completedCallback);
    }
};

function initializeConnection(readyCallback) {
    var urlBase = 'wss://push.planetside2.com/streaming';
    var environment = 'environment=ps2';
    var serviceID = 'service-id=s:Sq7FtUG1mfsn';

    var url = urlBase + '?' + environment + '&' + serviceID;

    ws = new _ws2.default(url);
    ws.onopen = function () {
        readyCallback();
    };
}

function _subscribe(subscription, eventReceivedCallback) {
    ws.send(JSON.stringify(subscription));
    ws.onmessage = function (e) {
        eventReceivedCallback(JSON.parse(e.data));
    };
}

function dropConnection(completedCallback) {
    ws.close();
    ws.onclose = function () {
        completedCallback();
    };
}

exports.default = wsApi;
'use strict';

var _wsApi = require('./API/wsApi.js');

var _wsApi2 = _interopRequireDefault(_wsApi);

var _WsApiSubscription = require('./API/WsApiSubscription.js');

var _WsApiSubscription2 = _interopRequireDefault(_WsApiSubscription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_wsApi2.default.connect(function () {
    var playerLoginSub = new _WsApiSubscription2.default([1], null, ['PlayerLogin', 'PlayerLogout']);
    _wsApi2.default.subscribe(playerLoginSub, function (data) {
        console.log(data);
    });
});
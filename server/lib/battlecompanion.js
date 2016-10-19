'use strict';

var _wsApi = require('./api/wsApi.js');

var _wsApi2 = _interopRequireDefault(_wsApi);

var _WsApiSubscription = require('./api/WsApiSubscription.js');

var _restApi = require('./api/restApi.js');

var _restApi2 = _interopRequireDefault(_restApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var query = new _restApi.RestApiQuery('character');
console.log(query.url);
_restApi2.default.get(query.url, function (data) {
    console.log(data);
});
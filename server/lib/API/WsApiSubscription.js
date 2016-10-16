'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WsApiSubscription = function WsApiSubscription() {
    var worlds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var characters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var eventNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var isSubscribe = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    _classCallCheck(this, WsApiSubscription);

    this.service = 'event';
    this.action = isSubscribe ? 'subscribe' : 'unsubscribe';
    if (worlds) {
        this.worlds = worlds;
    }
    if (characters) {
        this.characters = characters;
    }
    this.eventNames = eventNames;
};

exports.default = WsApiSubscription;
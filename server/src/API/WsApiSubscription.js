'use strict';

class WsApiSubscription {
    constructor(
        worlds     = [],
        characters = [],
        eventNames = [],
        isSubscribe = true) {

        this.service    = 'event';
        this.action     = isSubscribe ? 'subscribe' : 'unsubscribe';
        if(worlds) {
            this.worlds     = worlds;
        }
        if(characters) {
            this.characters = characters;
        }
        this.eventNames = eventNames;
    }
}

export default WsApiSubscription;
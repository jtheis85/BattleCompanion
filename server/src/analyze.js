'use strict';

import deathData from './api/data/deathData.js';
import { weaponDomain } from './api/datatypes/Weapon.js';

import { Server as WebSocketServer} from 'ws';

// TODO: Use process.setImmediate to make this play nicely with node
// as it is CPU intensive
//
// Maybe not... some crude profiling reveals that it's only taking
// fractions of a millisecond

let wss;

const analyze = {
    initialize() {
        wss = new WebSocketServer({port:8080});
        wss.on('connection', (connection) => {
            console.log('Connected');
            setInterval(() => analyze.deaths(connection), 3000);
        });
        console.log('Initialized');
    },
    deaths(connection) {
        const deaths = deathData.getDeaths();
        const nonInfantryKills = deaths.reduce((sum, value) => {
            if(value.domain !== weaponDomain.infantry) {
                return ++sum;
            } else return sum;
        }, 0);
        connection.send(`Non-infantry kills: ${nonInfantryKills}`);
        console.log('Message Sent');
    }
};

export default analyze;
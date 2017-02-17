'use strict';

import deathData          from './api/data/deathData.js';
import vehicleDestroyData from './api/data/vehicleDestroyData.js';
import { weaponDomain }   from './api/datatypes/Weapon.js';
import { vehicleDomain }  from './api/datatypes/Vehicle.js';

import { Server as WebSocketServer} from 'ws';

// TODO: Use process.setImmediate to make this play nicely with node
// as it is CPU intensive
//
// Maybe not... some crude profiling reveals that it's only taking
// fractions of a millisecond

let wss;

const analyze = {
    initialize() {
        console.log('Initializing...');

        const port = 8080;
        const wss = new WebSocketServer({port: port});
        console.log(`Listening on port: ${port}`);

        // When a client connects...
        wss.on('connection', connection => {
            console.log('Client connected.');

            // TODO: Does the client really need to send a message, or is just connecting enough?
            connection.on('message', message => {
                console.log('Client message received.');

                setInterval(() => sendClientMessage(connection), 3000);
            });

        });
        console.log('Initialization complete.');
    },

};

function sendClientMessage(connection) {
    const sum = vehicleDestroyData.getVehicleDestruction()
        .reduce((sum, death) => isAADeath(death) ? sum + 1 : sum, 0);
    const level = analyzeSum(sum);
    const json = JSON.stringify({level: level, sum: sum});
    connection.send(json);
    console.log(`Sent ${json}`);
}

function isAADeath(death) {
    return death.getVictimVehicleDomain() === vehicleDomain.air &&
        death.getDomain() !== weaponDomain.airVehicle;
}

function analyzeSum(sum) {
    return sum > 10 ? 'high' : 'low';
}

export default analyze;
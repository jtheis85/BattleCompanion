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

const INTERVAL = 3000;
const connections = [];

const analyze = {
    initialize() {
        console.log('Initializing...');

        const port = 8080;
        const wss = new WebSocketServer({port: port});
        console.log(`Listening on port: ${port}`);

        // When a client connects...
        wss.on('connection', connection => {
            connections.push(connection);
            console.log(`Client connected. (${connections.length})`);

            //connection.on('message', message => {
            //
            //});

            // TODO: Perhaps there's a ready state change event I should be listening
            // for instead to remove the connection more directly?
            connection.on('close', connection => {
                connections.remove(whereConnectionIsClosed);
                console.log(`Connection closed. (${connections.length})`);
            });

        });

        startAnalysis();
        console.log('Initialization complete.');
    },
};

function whereConnectionIsClosed(c) {
    return c.readyState === 3
}

function startAnalysis() {
    setInterval(() => {
        for(let connection of connections) {
            sendClientMessage(connection);
        }
    }, INTERVAL);
}

function sendClientMessage(connection) {
    const sum = vehicleDestroyData.getVehicleDestruction()
        .sum(death => isAADeath(death));
    const level = analyzeSum(sum);
    const json = JSON.stringify({level: level, sum: sum, interval: 3000});
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
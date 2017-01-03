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
        wss = new WebSocketServer({port:8080});
        wss.on('connection', (connection) => {
            connection.on('message', message => {
                console.log('Connected');
                setInterval(() => analyze.deaths(connection, message), 3000);
            });
        });
        console.log('Initialized');
        setInterval(() => analyze.analyzeAntiAir(), 3000);
    },
    deaths(connection, message) {
        const deaths = deathData.getDeaths();
        const nonInfantryKills = deaths.reduce((sum, death) => {
            if(death.getDomain() !== weaponDomain.infantry) {
                return sum + 1;
            } else return sum;
        }, 0);
        const content = JSON.parse(message);
        const server = content.route ? content.route.server : null;
        const faction = content.route ? content.route.faction : null;
        const response = `Server: ${server} Faction ${faction}`;
        connection.send(`${response}: ${nonInfantryKills}`);
        console.log('Message Sent');
    },
    analyzeAntiAir() {
        // Inclusive
        const thresholds = [
            { name: 'none', min: 0, max: 0 },
            { name: 'low', min: 1, max: 10 },
            { name: 'medium', min: 11, max: 20},
            { name: 'high', min: 31, max: Number.MAX_SAFE_INTEGER }
        ];

        const deaths = vehicleDestroyData.getVehicleDestruction();
        // Count deaths due to non-air sources
        const antiAirDeaths = deaths.reduce((sum, death) => {
            if(death.getVictimVehicleDomain() === vehicleDomain.air &&
                death.getDomain() !== weaponDomain.airVehicle) {
                return sum + 1;
            } else return sum;
        }, 0);
        console.log(`AA Deaths: ${antiAirDeaths} / Total ${deaths.length}`);
    }
};

export default analyze;
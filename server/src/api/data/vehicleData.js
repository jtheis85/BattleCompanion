'use strict';

import restApi          from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import Vehicle          from '../datatypes/Vehicle.js';
import { vehicleDomain } from '../datatypes/Vehicle.js';

// { '1': Vehicle { id: '1', name: 'Flash' },
//   '2': Vehicle { id: '2', name: 'Sunderer' },
//   '3': Vehicle { id: '3', name: 'Lightning' },
//   '4': Vehicle { id: '4', name: 'Magrider' },
//   '5': Vehicle { id: '5', name: 'Vanguard' },
//   '6': Vehicle { id: '6', name: 'Prowler' },
//   '7': Vehicle { id: '7', name: 'Scythe' },
//   '8': Vehicle { id: '8', name: 'Reaver' },
//   '9': Vehicle { id: '9', name: 'Mosquito' },
//   '10': Vehicle { id: '10', name: 'Liberator' },
//   '11': Vehicle { id: '11', name: 'Galaxy' },
//   '12': Vehicle { id: '12', name: 'Harasser' },
//   '13': Vehicle { id: '13', name: 'Drop Pod' },
//   '14': Vehicle { id: '14', name: 'Valkyrie' },
//   '15': Vehicle { id: '15', name: 'ANT' },
//   '100': Vehicle { id: '100', name: 'Xiphos Anti-Personnel Phalanx Turret' },
//   '101': Vehicle { id: '101', name: 'MANA Anti-Personnel Turret' },
//   '102': Vehicle { id: '102', name: 'MANA Anti-Vehicle Turret' },
//   '103': Vehicle { id: '103', name: 'Spitfire Auto-Turret' },
//   '104': Vehicle { id: '104', name: 'Spitfire Auto-Turret' },
//   '105': Vehicle { id: '105', name: 'AA SpitFire Turret' },
//   '150': Vehicle { id: '150', name: 'Aspis Anti-Aircraft Phalanx Turret ' },
//   '151': Vehicle { id: '151', name: 'Spear Anti-Vehicle Phalanx Turret' },
//   '160': Vehicle { id: '160', name: 'Spear Anti-Vehicle Tower' },
//   '161': Vehicle { id: '161', name: 'Aspis Anti-Aircraft Phalanx Tower' },
//   '162': Vehicle { id: '162', name: 'Xiphos Anti-Personnel Tower' },
//   '163': Vehicle { id: '163', name: 'Glaive IPC' },
//   '1013': Vehicle { id: '1013', name: 'Recon Drone' },
//   '2006': Vehicle { id: '2006', name: 'Spear Anti-Vehicle Phalanx Turret' } }


const vehicleDictionary = Object.create(null);

const vehicleData = {
    startFetchVehicles(callback) {
        const vehicleQuery = new RestApiQuery('vehicle', {}, 50);
        restApi.get(vehicleQuery.url, data => {
            buildVehicleDictionary(data);
            callback(vehicleDictionary);
        });
    },
    getVehicles() {
        return vehicleDictionary;
    },
    getVehicle(id) {
        return vehicleDictionary[id];
    }
};

function buildVehicleDictionary(data) {
    data.vehicle_list.forEach(vehicle => {
        const id = parseInt(vehicle.vehicle_id);
        vehicleDictionary[id] = new Vehicle(
            id,
            vehicle.name.en,
            vehicleDomainLookup[id] || vehicleDomain.other
        )
    });
}

const vehicleDomainLookup = Object.create(null);
function buildVehicleCategoryLookup() {
    const categories = {
        air: air, ground: ground,
        base: base, construction: construction
    };

    for(const key in categories) {
        if(!categories.hasOwnProperty(key)) continue;

        categories[key].forEach(id => {
            vehicleDomainLookup[id] = vehicleDomain[key];
        });
    }
}

const air = [
    7, // Scythe
    8, // Reaver
    9, // Mosquito
    10, // Liberator
    11, // Galaxy
    14, // Valkyrie
];

const ground = [
    1, // Flash
    2, // Sunderer
    3, // Lightning
    4, // Magrider
    5, // Vanguard
    6, // Prowler
    12, // Harasser
    15, // ANT
];

const base = [
    100, // Xiphos Anti-Personnel Phalanx Turret
    150, // Aspis Anti-Aircraft Phalanx Turret
    151, // Spear Anti-Vehicle Phalanx Turret
];

const construction = [
    160, // Spear Anti-Vehicle Tower
    161, // Aspis Anti-Aircraft Phalanx Tower
    162, // Xiphos Anti-Personnel Tower
    163, // Glaive IPC
    2006, // Spear Anti-Vehicle Phalanx Turret
];

buildVehicleCategoryLookup();

export default vehicleData;
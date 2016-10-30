'use strict';

import restApi          from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import Vehicle          from '../datatypes/Vehicle.js';

const vehicleDictionary = Object.create(null);

const vehicleData = {
    startFetchVehicles(callback) {
        const vehicleQuery = new RestApiQuery('vehicle', {}, 50);
        restApi.get(vehicleQuery.url, data => {
            buildVehicleictionary(data);
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

function buildVehicleictionary(data) {
    data.vehicle_list.forEach(vehicle => {
        vehicleDictionary[vehicle.vehicle_id] = new Vehicle(
            vehicle.vehicle_id,
            vehicle.name.en
        )
    });
}

export default vehicleData;
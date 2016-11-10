'use strict';

import restApi          from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import Zone             from '../datatypes/Zone.js';

const zoneDictionary = Object.create(null);

const zoneData = {
    startFetchZones(callback) {
        const zonesQuery = new RestApiQuery('zone', {}, 10);
        restApi.get(zonesQuery.url, (data) => {
            buildZoneDictionary(data);
            callback(zoneDictionary);
        });
    },
    getZones() {
        return zoneDictionary;
    },
    getZone(id) {
        return zoneDictionary[id];
    }
};

const buildZoneDictionary = (data) => {
    data.zone_list.forEach(zone => {
        zoneDictionary[zone.zone_id] = new Zone(
            zone.zone_id,
            zone.name.en
        );
    })
};

export default zoneData;
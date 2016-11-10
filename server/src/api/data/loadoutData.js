'use strict';

import factionData      from './factionData.js';
import restApi          from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import Loadout          from '../datatypes/Loadout.js';

const loadoutDictionary = Object.create(null);

const loadoutData = {
    startFetchLoadouts(callback) {
        const loadoutsQuery = new RestApiQuery('loadout', {}, 100);
        restApi.get(loadoutsQuery.url, (data) => {
            buildLoadoutDictionary(data);
            callback(loadoutDictionary);
        });
    },
    getLoadouts() {
        return loadoutDictionary;
    },
    getLoadout(id) {
        return loadoutDictionary[id];
    }
};

function buildLoadoutDictionary(data) {
    data.loadout_list.forEach((loadout) => {
        const faction = factionData[loadout.faction_id];
        loadoutDictionary[loadout.loadout_id] = new Loadout(
            loadout.loadout_id,
            faction,
            loadout.code_name
        );
    });
}

export default loadoutData;
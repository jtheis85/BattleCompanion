'use strict';

import restApi          from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import World            from '../datatypes/World.js';

const worldDictionary = Object.create(null);

const worldData = {
    startFetchWorlds(callback) {
        const worldsQuery = new RestApiQuery('world',{}, 20);
        restApi.get(worldsQuery.url, data => {
            buildWorldDictionary(data);
            callback(worldDictionary);
        });
    },
    getWorlds() {
        return worldDictionary;
    },
    getWorld(id) {
        return worldDictionary[id];
    }
};

const buildWorldDictionary = (data) => {
    data.world_list.forEach(world => {
        worldDictionary[world.world_id] = new World(
            world.world_id,
            world.name.en
        );
    });
};

export default worldData;
'use strict';

let data = {};

const aggregator = {
    initialize(worlds, zones, factions) {
        worlds.forEach(world => {
            let continents = {};
            zones.forEach(zone => {
                let teams = {};
                factions.forEach(faction => {
                    teams[faction.abbreviation] = [];
                });
                continents[zone.name] = teams;
            });
            data[world.name] = continents;
        });
    },
    get() {
        return data;
    }
};

export default aggregator;
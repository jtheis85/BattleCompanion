'use strict';

import deathData from './api/data/deathData.js';
import { weaponDomain } from './api/datatypes/Weapon.js';

const analyze = {
    deaths() {
        const deaths = deathData.getDeaths();

        const nonInfantryKills = deaths.reduce((sum, value) => {
            if(value.domain !== weaponDomain.infantry) {
                return ++sum;
            } else return sum;
        }, 0);

        console.log(`Non-infantry kills: ${nonInfantryKills}`);
    }
};

export default analyze;
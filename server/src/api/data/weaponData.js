'use strict';

import restApi from '../restApi.js';
import { RestApiQuery } from '../restApi.js';

const weaponDictionary = Object.create(null);

const weaponData = {
    startFetchWeapons(callback) {
        const weaponsQuery = new RestApiQuery(
            'item',
            {
                item_type_id: 26,
                'c:show': 'item_id,name.en'
            },
            1000
        );

        console.log(weaponsQuery.url);
        restApi.get(weaponsQuery.url, data => {
            var weapons = data.item_list.map(weapon => (
                {
                    item_id: weapon.item_id,
                    name: weapon.name? weapon.name.en : ''
                }
            ));
            console.log(weapons);
        });
    },
    getWeapons() {
        return weaponDictionary;
    },
    getWeapon(id) {
        return weaponDictionary[id];
    }
};

export default weaponData;
'use strict';

import Faction from '../datatypes/Faction.js';

let factionData = Object.create(null);

const vs = new Faction(1, 'VS', 'Vanu Sovereignty');
factionData['vs'] = vs;

const nc = new Faction(2, 'NC', 'New Conglomerate');
factionData['nc'] = nc;

const tr = new Faction(3, 'TR', 'Terran Republic');
factionData['tr'] = tr;

export default factionData;
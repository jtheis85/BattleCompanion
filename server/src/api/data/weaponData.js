'use strict';

import restApi from '../restApi.js';
import { RestApiQuery } from '../restApi.js';
import { Weapon } from '../datatypes/Weapon.js';
import { weaponDomain, weaponCategory } from '../datatypes/Weapon.js';

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

        restApi.get(weaponsQuery.url, data => {
            buildWeaponDictionary(data);
            callback(weaponDictionary);
        });
    },
    getWeapons() {
        return weaponDictionary;
    },
    getWeapon(id) {
        return weaponDictionary[id];
    }
};

const buildWeaponDictionary = (data) => {
    data.item_list.forEach(weapon => {
        const id = parseInt(weapon.item_id);
        weaponDictionary[id] = new Weapon(
            id,
            weapon.name? weapon.name.en : '',
            // Just treat unknown weapons as infantry until proven otherwise
            (weaponDomainLookup[id] || weaponDomain.infantry),
            (weaponCategoryLookup[id] || weaponCategory.infSmallArms)
        );
    });
};

// Map weapon IDs to domains
let weaponDomainLookup = Object.create(null);
function buildWeaponDomainLookup() {

    const domains = {
        airVehicle: airVehicle,
        groundVehicle: groundVehicle,
        max: max,
        base: base,
        construction: construction
    };

    for(const key in domains) {
        if(!domains.hasOwnProperty(key)) continue;

        domains[key].forEach(id => {
            weaponDomainLookup[id] = weaponDomain[key];
        })
    }
}

const weaponCategoryLookup = Object.create(null);
function buildWeaponCategoryLookup() {

    const categories = {
        galaxy: galaxy, esf: esf, liberator: liberator, valkyrie: valkyrie,
        flash: flash, harasser: harasser, ant: ant,
        sunderer: sunderer, lightning: lightning, mbt: mbt,
        infExplosives: infExplosives, infSniperRifle: infSniperRifle, infLauncher: infLauncher,
        maxSmallArms: maxSmallArms, maxLongRange: maxLongRange,
        base: base, construction: construction
    };

    for(const key in categories) {
        if(!categories.hasOwnProperty(key)) continue;

        categories[key].forEach(id => {
            weaponCategoryLookup[id] = weaponCategory[key]
        });
    }
}

const galaxy = [
    5502, // M20 Drake left
    5503, // M20 Drake right
    5506, // M20 Drake
    5507, // M20 Drake
    5510, // M20 Drake
    5511, // M20 Drake
    5514, // M60-A Bulldog
    5515, // M60-A Bulldog
    5518, // M60-A Bulldog
    5519, // M60-A Bulldog
    5522, // M60-A Bulldog
    5523, // M60-A Bulldog
    5500, // M20 Drake top
    5501, // M20 Drake tail
    5504, // M20 Drake top
    5505, // M20 Drake tail
    5508, // M20 Drake
    5509, // M20 Drake
];

const esf = [

    // Scythe Primary

    4302, // Saron Laser Cannon
    4304, // Maelstrom Turbo Laser
    4305, // Light PPA
    4445, // Antares LC

    // Reaver Primary

    4600, // M20 Mustang
    4604, // Vortek Rotary
    4605, // M30 Mustang AH
    4745, // M20 Kestrel

    // Mosquito Primary

    4900, // M18 Needler
    4906, // M14 Banshee
    4911, // M18 Rotary
    5050, // M18 Locust

    // Scythe Secondary

    4300, // Photon A2A Missile Pods
    4301, // Dual Photon Pods
    4446, // Hornet Missiles
    4447, // Coyote Missiles

    // Reaver Secondary

    4601, // Breaker Rocket Pods
    4602, // Tomcat A2AM Pods
    4746, // Hornet Missiles
    4747, // Coyote Missiles

    // Mosquito Secondary

    4903, // Hellfire Rocket Pods
    4905, // Tomcat A2AM Pods
    5051, // Hornet Missiles
    5052, // Coyote Missiles
];

const liberator = [

    // Primary

    5206, // L-30R Vektor
    5207, // L-30R Vektor
    5208, // L-30R Vektor
    5215, // CAS30 Tank Buster
    5216, // CAS30 Tank Buster
    5217, // CAS30 Tank Buster
    5218, // L-24R Spur
    5219, // L-24R Spur
    5220, // L-24R Spur

    // Belly

    5209, // AP30 Shredder
    5210, // AP30 Shredder
    5211, // AP30 Shredder
    5224, // C150 Dalton
    5225, // C150 Dalton
    5226, // C150 Dalton
    5227, // L105 Zepher
    5228, // L105 Zepher
    5229, // L105 Zepher
    5250, // L105 Zepher PX
    5251, // L105 Zepher PX
    5252, // L105 Zepher PX
    5441, // Dual-75 Duster
    5442, // Dual-75 Duster
    5443, // Dual-75 Duster

    // Tail

    5200, // M20 Drake
    5202, // M20 Drake
    5204, // M20 Drake
    5212, // A30 Walker
    5213, // A30 Walker
    5214, // A30 Walker
    5221, // M60-A Bulldog
    5222, // M60-A Bulldog
    5223, // M60-A Bulldog
    5494, // Hyena Missile Launcher
    5495, // Hyena Missile Launcher
    5496, // Hyena Missile Launcher
];

const valkyrie = [
    6550, // M20 Wyvern
    6551, // M20 Wyvern
    6552, // M20 Wyvern
    6553, // CAS 14-E
    6554, // CAS 14-E
    6555, // CAS 14-E
    6556, // Hellion G20
    6557, // Hellion G20
    6558, // Hellion G20
    6559, // Pelter Rocket Pod
    6560, // Pelter Rocket Pod
    6561, // Pelter Rocket Pod
    6562, // VLG Missile Launcher
    6563, // VLG Missile Launcher
    6564, // VLG Missile Launcher
];

const flash = [
    2500, 2501, 2502, // Kobalt
    2507, 2508, 2509, // Basilisk
    2510, 2511, 2512, // Fury
    2657, 2658, 2659, // shotgun
];

const harasser = [
    6100, // M12 Kobalt-H
    6101, // M12 Kobalt-H
    6102, // M12 Kobalt-H
    6103, // M20 Basilisk-H
    6104, // M20 Basilisk-H
    6105, // M20 Basilisk-H
    6106, // G30 Walker
    6107, // G30 Walker
    6108, // G30 Walker
    6109, // G40-F Ranger
    6110, // G40-F Ranger
    6111, // G40-F Ranger
    6112, // M60-G Bulldog-H
    6113, // M60-G Bulldog-H
    6114, // M60-G Bulldog-H
    6115, // M40 Fury-H
    6116, // M40 Fury-H
    6117, // M40 Fury-H
    6118, // E540 Halberd-H
    6119, // E540 Halberd-H
    6120, // E540 Halberd-H
    6121, // G20 Vulcan-H
    6122, // P525 Marauder-H
    6123, // Enforcer ML65-H
    6124, // C85 Canister-H
    6125, // Proton II PPA-H
    6126, // Saron HRB-H
    802875, // MR11 Gatekeeper-H
    802898, // Aphelion VEX-4H
    802900, // M96 Mjolnir-H
];

const ant = [
    803482, // M12 Kobalt
    803483, // M12 Kobalt
    803484, // M12 Kobalt
    803485, // G30 Walker
    803486, // G30 Walker
    803487, // G30 Walker
    803488, // G40-F Ranger
    803489, // G40-F Ranger
    803490, // G40-F Ranger
    803491, // M40 Fury
    803492, // M40 Fury
    803493, // M40 Fury
    803494, // M60-G Bulldog
    803495, // M60-G Bulldog
    803496, // M60-G Bulldog
    803501, // M20 Basilisk
    803502, // M20 Basilisk
    803503, // M20 Basilisk
];

const sunderer = [
    2800, 2801, 2802, // Kobalt
    2803, 2804, 2805, // Basilisk
    2806, 2807, 2808, // Kobalt
    2809, 2810, 2811, // Basilisk
    2832, 2833, 2834, 2835, 2836, 2837, // Bulldog
    2874, 2875, 2876, 2877, 2878, 2879, // Fury
    3080, 3081, 3082, 3083, 3084, 3085, // Walker
    3086, 3087, 3088, 3089, 3090, 3091, // Ranger
];

const lightning = [
    3100, 3101, 3102, // Viper
    3103, 3104, 3105, // AP
    3106, 3107, 3108, // Skyguard
    3153, 3154, 3155, // HE
    3156, 3157, 3158, // HEAT
];

const mbt = [
    // Magrider

    3400, // Supernova PC
    3401, // M12 Kobalt
    3402, // M20 Basilisk
    3403, // G30 Walker
    3404, // Proton II PPA
    3406, // G40-F Ranger
    3427, // Supernova-R PC
    3441, // E540 Halberd
    3442, // Saron HRB
    3460, // Supernova FPC
    3461, // Supernova VPC
    802897, // Aphelion VEX-4

    // Vanguard

    3700, // Titan-150 HEAT
    3701, // M12 Kobalt
    3702, // M20 Basilisk
    3703, // G30 Walker
    3704, // Enforcer ML85
    3707, // C85 Canister
    3708, // G40-F Ranger
    3709, // E540 Halberd
    3730, // Titan-150 AP
    3731, // Titan-150 HE
    3756, // 150mm Titan-R HEAT
    802899, // M96 Mjolnir

    // Prowler

    4000, // P2-120 HEAT
    4001, // M12 Kobalt
    4002, // M20 Basilisk
    4003, // G30 Walker
    4007, // P525 Marauder
    4008, // P2-120 AP
    4009, // P2-120 HE
    4010, // G40-F Ranger
    4015, // E540 Halberd
    4016, // P2-120-R HEAT
    4029, // G30 Vulcan
    802874, // MR11 Gatekeeper
];

const infSniperRifle = [
    87, // NC14 Bolt Driver
    88, // 99SV
    89, // VA39 Spectre
    2311,  // NS-30 Vandal
    2312,  // NS-30B Vandal
    2313,  // NS-30G Vandal
    7301,  // AF-8 RailJack
    7316,  // TRAP-M1
    7337,  // Phaseshift VX-S
    24000, // Gauss SPR
    24001, // SAS-R
    24002, // Impetus
    24003, // LA80
    24004, // EM4 Longshot
    24007, // AF-6 Shadow
    25000, // M77-B
    25001, // TSAR-42
    25002, // KSR-35
    25003, // SR-7
    25004, // RAMS .50M
    25007, // HSR-1
    26000, // XM98
    26001, // Ghost
    26002, // Phantom VA23
    26003, // V10
    26004, // Parallax VX3
    26007, // Nyx VX31
    6002732, // Parallax VX3-AE
    6002745, // RAMS-AE .50M
    6002758, // EM4-AE Longshot
];

const infLauncher = [
    84, // Shrike
    85, // ML-7
    86, // S1
    266, //Phoenix  AE
    267, //Striker AE
    268, //Lancer AE
    33002, // NC15 Phoenix
    33003, // AF-22 Crow
    33004, // Hawk GD-68
    34002, // T2 Striker
    34003, // M9 SKEP Launcher
    34004, // ASP-30 Grounder
    35002, // Lancer VS22
    35003, // Hades VSH4
    35004, // Nemesis VSH9
    50560, // NS Decimator
    50561, // NS Annihilator
    71563, // Anti-Vehicle MANA Turret
    71564, // Anti-Vehicle MANA Turret
    71565, // Anti-Vehicle MANA Turret
    802299, // NS Decimator-G
    802300, // NS Decimator-B
    802301, // NS Annihilator-G
    802302, // NS Annihilator-B
    802969, // NS-R3 Swarm
    6002637, // NS-R3 "Ravenous" Swarm
];

const infExplosives = [
    432,    // C-4
    650,    // Tank Mine
    880, 881, 882, // Sticky Grenade
    1044,   // Bouncing Betty
    1045,   // Proximity Mine
    1095,   // AV Grenade
    44505, 44605, 44705, // Frag Grenade
    800623, // C-4 ARX
];

const maxSmallArms = [
    1082, 1083, 1084, // Max Punch
    7505, // AF-34 Mattock
    7506, // AF-41 Hacksaw
    7507, // AF-23 Grinder
    7512, // M6 Onslaught
    7513, // M2 Mutilator
    7518, // MRC3 Mercy
    7519, // Nebula VM20
    7520, // Cosmos VM3
    7525, // Blueshift VM5
    15000, // M1 Heavy Cycler
    15001, // M3 Pounder HEG
    15012, // M1 Heavy Cycler
    15013, // M3 Pounder HEG
    15024, // M6 Onslaught
    15025, // M2 Mutilator
    15030, // MRC3 Mercy
    16000, // NCM1 Scattercannon
    16012, // NCM1 Scattercannon
    16024, // AF-34 Mattock
    16025, // AF-41 Hacksaw
    16026, // AF-23 Grinder
    17000, // Quasar VM1
    17012, // Quasar VM1
    17024, // Nebula VM20
    17025, // Cosmos VM3
    17030, // Blueshift VM5
    804652, // NS-20 Gorgon
    804653, // NS-20 Gorgon
    804654, // NS-20 Gorgon
    804655, // NS-20 Gorgon
    804656, // NS-20 Gorgon
    804657, // NS-20 Gorgon
    804717, // NS-20B Gorgon
    804718, // NS-20B Gorgon
    804719, // NS-20B Gorgon
    804720, // NS-20B Gorgon
    804721, // NS-20B Gorgon
    804722, // NS-20B Gorgon
    804723, // NS-20G Gorgon
    804724, // NS-20G Gorgon
    804725, // NS-20G Gorgon
    804726, // NS-20G Gorgon
    804727, // NS-20G Gorgon
    804728, // NS-20G Gorgon
];

const maxLongRange = [
    15004, // NS-10 Burster
    15016, // NS-10 Burster
    16001, // NCM2 Falcon
    16004, // NS-10 Burster
    16013, // NCM2 Falcon
    16016, // NS-10 Burster
    16028, // NCM3 Raven
    16029, // NCM3 Raven
    16030, // MR1 Fracture
    16031, // MR1 Fracture
    16032, // Vortex VM21
    16033, // Vortex VM21
    17001, // Comet VM2
    17004, // NS-10 Burster
    17013, // Comet VM2
    17016, // NS-10 Burster
    804741, // NS-10B Burster
    804742, // NS-10B Burster
    804743, // NS-10B Burster
    804744, // NS-10B Burster
    804745, // NS-10B Burster
    804746, // NS-10B Burster
    804747, // NS-10G Burster
    804748, // NS-10G Burster
    804749, // NS-10G Burster
    804750, // NS-10G Burster
    804751, // NS-10G Burster
    804752, // NS-10G Burster
];

const base = [
    551, 552, 553, 724, 725, 726, // Xiphos AI Turret
    700, 701, 702, 727, // Aspis AA turret
    703, 704, 705, 730, // Spear AV turret
];

const construction = [
    803427, // Spear Anti-Vehicle Tower
    803428, // Spear Anti-Vehicle Tower
    803429, // Spear Anti-Vehicle Tower
    803431, // Spear Anti-Vehicle Phalanx Tower
    803432, // Spear Anti-Vehicle Phalanx Tower
    803433, // Spear Anti-Vehicle Phalanx Tower
    803434, // Spear Anti-Vehicle Phalanx Tower
    803588, // Aspis Anti-Aircraft Tower
    803589, // Aspis Anti-Aircraft Tower
    803590, // Aspis Anti-Aircraft Tower
    803591, // Xiphos Anti-Personnel Tower
    803592, // Xiphos Anti-Personnel Tower
    803593, // Xiphos Anti-Personnel Tower
    803594, // Aspis Anti-Aircraft Phalanx Tower
    803595, // Aspis Anti-Aircraft Phalanx Tower
    803596, // Aspis Anti-Aircraft Phalanx Tower
    803597, // Aspis Anti-Aircraft Phalanx Tower
    803598, // Xiphos Anti-Personnel Phalanx Tower
    803599, // Xiphos Anti-Personnel Phalanx Tower
    803600, // Xiphos Anti-Personnel Phalanx Tower
    803601, // Xiphos Anti-Personnel Phalanx Tower
    6002390, // Glaive IPC
    6002391, // Glaive IPC
    6002392, // Glaive IPC
    6002399, // Spear Anti-Vehicle Turret
    6002405, // Spear Anti-Vehicle Turret
    6002419, // Spear Anti-Vehicle Turret
    6002450, // Spear Anti-Vehicle Phalanx Turret
    6002451, // Spear Anti-Vehicle Phalanx Turret
    6002452, // Spear Anti-Vehicle Phalanx Turret
];

const max = [].concat(maxSmallArms, maxLongRange);

const groundVehicle = [].concat(flash, harasser, ant, sunderer, lightning, mbt);

const airVehicle = [].concat(valkyrie, esf, liberator, galaxy);

buildWeaponDomainLookup();
buildWeaponCategoryLookup();

export default weaponData;
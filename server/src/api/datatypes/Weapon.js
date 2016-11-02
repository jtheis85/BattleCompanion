'use strict';

const weaponDomain = {
    airVehicle:    'WEAPON_DOMAIN_AIR',
    groundVehicle: 'WEAPON_DOMAIN_GROUND_VEHICLE',
    infantry:      'WEAPON_DOMAIN_INFANTRY',
    max:           'WEAPON_DOMAIN_MAX',
    base:          'WEAPON_DOMAIN_BASE',
    construction:  'WEAPON_DOMAIN_CONSTRUCTION',
    unknown:       'WEAPON_DOMAIN_UNKNOWN'
};

const weaponCategory = {
    galPrimary:   'WEAPON_CATEGORY_GALAXY_PRIMARY',
    galSecondary: 'WEAPON_CATEGORY_GALAXY_SECONDARY',
    esfPrimary:   'WEAPON_CATEGORY_ESF_PRIMARY',
    esfSecondary: 'WEAPON_CATEGORY_ESF_SECONDARY',
    libPrimary:   'WEAPON_CATEGORY_LIB_PRIMARY',
    libBelly:     'WEAPON_CATEGORY_LIB_BELLY',
    libTail:      'WEAPON_CATEGORY_LIB_TAIL',
    valkyrie:     'WEAPON_CATEGORY_VALKYRIE',

    flash:        'WEAPON_CATEGORY_FLASH',
    harasser:     'WEAPON_CATEGORY_HARASSER',
    ant:          'WEAPON_CATEGORY_ANT',
    sunderer:     'WEAPON_CATEGORY_SUNDERER',
    lightning:    'WEAPON_CATEGORY_LIGHTNING',
    mbtPrimary:   'WEAPON_CATEGORY_MBT_PRIMARY',
    mbtSecondary: 'WEAPON_CATEGORY_MBT_SECONDARY',

    // Most primaries and secondaries, melee, etc.
    // AI MANA turret, sentry turret
    infSmallArms:   'WEAPON_CATEGORY_INFANTRY_SMALL_ARMS',
    infSniperRifle: 'WEAPON_CATEGORY_INFANTRY_SNIPER_RIFLE',
    // Dumbfires, lockons, AV MANA Turret
    infLauncher:    'WEAPON_CATEGORY_INFANTRY_LAUNCHER',
    // Grenades, mines, C4
    infExplosive:   'WEAPON_CATEGORY_INFANTRY_EXPLOSIVE',

    // Shotguns, chainguns, melee, etc
    maxSmallArms: 'WEAPON_CATEGORY_MAX_SMALL_ARMS',
    // Bursters, long-range AV
    maxLongRange: 'WEAPON_CATEGORY_MAX_LONG_RANGE',

    base:         'WEAPON_CATEGORY_BASE',
    construction: 'WEAPON_CATEGORY_CONSTRUCTION',
    unknown:      'WEAPON_CATEGORY_UNKNOWN'
};

class Weapon {
    constructor(
        id,
        name,
        weaponDomain   = weaponDomain.infantry,
        weaponCategory = weaponCategory.infSmallArms) {

        this.id             = id;
        this.name           = name;
        this.weaponDomain   = weaponDomain;
        this.weaponCategory = weaponCategory;
    }
}

export { Weapon as default, weaponCategory}
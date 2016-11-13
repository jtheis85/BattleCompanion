'use strict';

class Vehicle {
    constructor(id, name, domain) {
        this.id     = id;
        this.name   = name;
        this.domain = domain;
    }
}

const vehicleDomain = {
    air:          'VEHICLE_DOMAIN_AIR',
    ground:       'VEHICLE_DOMAIN_GROUND',
    base:         'VEHICLE_DOMAIN_BASE',
    construction: 'VEHICLE_DOMAIN_CONSTRUCTION',
    other:        'VEHICLE_DOMAIN_OTHER'
};

export { Vehicle as default, vehicleDomain };
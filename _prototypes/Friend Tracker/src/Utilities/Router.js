'use strict';

var Router = {
    initialize() {
        return this.getRoute(location.hash);
    },
    getRoute(hash) {
        // Chop off the leading #
        return hash.slice(1);
    }
};

module.exports = Router;
// A single place for the app's service ID to reside
//
// DO NOT CHECK THIS FILE IN TO SOURCE CONTROL WITHOUT FIRST CHANGING THE SERVICE ID!

'use strict';

// TODO: Change service IDs
// Looks like you were an idiot and checked in the service ID in a different file (JSONP.js)
// You're going to need to change IDs eventually.

let ServiceInfo = {
    ID: 'Sq7FtUG1mfsn',
    namespace: 's',
    queryParameterName: 'service-id',
    getNamespacedID() {
        return this.namespace + ':' + this.ID;
    },
    getQueryParameter() {
        return `${this.queryParameterName}=${this.getNamespacedID()}`;
    }
};

export default ServiceInfo;
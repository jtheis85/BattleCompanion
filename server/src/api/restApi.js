'use strict';

import https   from 'https';
import concat from 'concat-stream';

const restApi = {
    get(url, callback) {
        https.get(url, (response) => {
            response.pipe(concat(function(data) {
                var result = JSON.parse(data.toString());
                callback(result);
            }));
        });
    }
};

class RestApiQuery {
    constructor(query) {
        const domain    = 'https://census.daybreakgames.com';
        const serviceId = 's:Sq7FtUG1mfsn';
        const verb      = 'get';
        const namespace = 'ps2';
        const version   = 'v2';

        this.url = `${domain}/${serviceId}/${verb}/${namespace}:${version}/${query}`;
    }
}

export { restApi as default, RestApiQuery };

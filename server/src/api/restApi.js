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
    constructor(collection, queryParams, limit) {
        const domain    = 'https://census.daybreakgames.com';
        const serviceId = 's:Sq7FtUG1mfsn';

        let query = '';
        if(queryParams) {
            let params = [];
            for(let param in queryParams) {
                if(!queryParams.hasOwnProperty(param)) continue;
                params.push(`${param}=${queryParams[param]}`);
            }
            query = `?${params.join('&')}`;
        }

        if(limit) {
            query += `&c:limit=${limit}`;
        }

        this.url = `${domain}/${serviceId}/get/ps2:v2/${collection}${query}`;
    }
}

export { restApi as default, RestApiQuery };

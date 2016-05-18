'use strict';

import Query from '../../../Common/src/API/Query.js';
import JSONP from '../../../Common/src/Utilities/JSONP.js';

const friendsLoadCallbackString = '&callback=friendsLoad';

var friendsLoadCallback;


const Data = {
    startFetchFriends: (callback) => {
        const friendQuery = getFriendQuery();
        JSONP.loadData(friendQuery);
        friendsLoadCallback = callback;
    }
};

function getFriendQuery() {
    const queryBody = 'characters_friend?character_id=5428013610422131937';
    return Query.APIURL + queryBody + friendsLoadCallbackString;
}

// Must be on Window for JSONP to work
window.friendsLoad = (data) => {
    friendsLoadCallback(data);
};

module.exports = Data;
'use strict';

import Query   from '../../../Common/src/API/Query.js';
import PushAPI from '../../../Common/src/API/PushAPI.js';
import JSONP   from '../../../Common/src/Utilities/JSONP.js';

var friendsLoadCallback;

const Data = {
    startFetchFriends: (callback) => {
        const friendQuery = getFriendQuery();
        JSONP.loadData(friendQuery);
        friendsLoadCallback = callback;
    },
    onFriendLoginEvent: (friends, callback) => {
        const pushQuery = getPushAPIQuery(friends);
        PushAPI.connect((data) => {
            // TODO: Process data here
            callback(data);
        }, pushQuery);
    }
};

function getFriendQuery() {
    const callbackString = '&callback=friendsLoad';
    const queryBody = 'characters_friend?character_id=5428013610422131937&c:join=character^on:friend_list.character_id^to:character_id^inject_at:friend_character_info';
    return Query.APIURL + queryBody + callbackString;
}

function getPushAPIQuery(friends) {
    // Extract all the friend IDs
    const charIds = friends.map((f) => '"' + f.id +'"');

    // Build up all the query parameters
    const service    = '"service":"event"';
    const action     = '"action":"subscribe"';
    //const worlds     = '"worlds":["17"]';
    const characters = '"characters":[' + charIds.join(',') + ']';
    const eventNames = '"eventNames":["PlayerLogin","PlayerLogout"]';

    // Collect all the parameters
    const queryParams = [service, action, characters, eventNames];

    // Finalize the query
    return '{' + queryParams.join(',') + '}';
}

// Must be on Window for JSONP to work
window.friendsLoad = (data) => {
    var friends = data.characters_friend_list[0].friend_list.map((f) => ({
        id:        f.character_id,
        name:      f.friend_character_info.name.first,
        lastLogin: f.last_login_time,
        status:    f.online
    }));
    friendsLoadCallback(friends);
};

module.exports = Data;
'use strict';

import Query from '../../../Common/src/API/Query.js';
import JSONP from '../../../Common/src/Utilities/JSONP.js';

var friendsLoadCallback;

const Data = {
    startFetchFriends: (callback) => {
        const friendQuery = getFriendQuery();
        JSONP.loadData(friendQuery);
        friendsLoadCallback = callback;
    }
};

function getFriendQuery() {
    const callbackString = '&callback=friendsLoad';
    const queryBody = 'characters_friend?character_id=5428013610422131937&c:join=character^on:friend_list.character_id^to:character_id^inject_at:friend_character_info';
    return Query.APIURL + queryBody + callbackString;
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
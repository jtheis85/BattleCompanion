'use strict';

import Query   from '../../../Common/src/API/Query.js';
import PushAPI from '../../../Common/src/API/PushAPI.js';
import JSONP   from '../../../Common/src/Utilities/JSONP.js';

var searchLoadCallback;
var friendsLoadCallback;

const Data = {
    startFetchSearchResults(searchText, callback) {
        var searchQuery = getSearchQuery(searchText);
        JSONP.loadData(searchQuery);
        searchLoadCallback = callback;
    },
    startFetchFriends(user_id, callback) {
        const friendQuery = getFriendQuery(user_id);
        JSONP.loadData(friendQuery);
        friendsLoadCallback = callback;
    },
    onFriendLoginEvent: (friends, callback) => {
        const pushQuery = getPushAPIQuery(friends);
        PushAPI.connect((data) => {
            if(data.payload) {
                const eventData = {
                    id:        data.payload.character_id,
                    eventName: data.payload.event_name
                };
                callback(eventData);
            }
        }, pushQuery);
    }
};

function getSearchQuery(searchText) {
    const callbackString = '&callback=searchLoad';
    const queryBody = 'character_name/?name.first_lower=^' + searchText.toLowerCase() + '&c:limit=10&c:show=character_id,name.first&c:sort=name.first';
    return Query.APIURL + queryBody + callbackString;
}

function getFriendQuery(user_id) {
    const callbackString = '&callback=friendsLoad';
    const queryBody = 'characters_friend?character_id='+ user_id +'&c:join=character^on:friend_list.character_id^to:character_id^inject_at:friend_character_info';
    return Query.APIURL + queryBody + callbackString;
}

function getPushAPIQuery(friends) {
    // Extract all the friend IDs
    const charIds = friends.map((f) => '"' + f.id +'"');

    // Build up all the query parameters
    const service    = '"service":"event"';
    const action     = '"action":"subscribe"';
    const characters = '"characters":[' + charIds.join(',') + ']';
    const eventNames = '"eventNames":["PlayerLogin","PlayerLogout"]';

    // Collect all the parameters
    const queryParams = [service, action, characters, eventNames];

    // Finalize the query
    return '{' + queryParams.join(',') + '}';
}

// Must be on Window for JSONP to work
window.searchLoad = (data) => {
    const results = data.character_name_list.map((c) => ({
        id:   c.character_id,
        name: c.name.first
    }));
    searchLoadCallback(results);
};

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
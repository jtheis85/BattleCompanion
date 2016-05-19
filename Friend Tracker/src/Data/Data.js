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
    const queryBody = 'characters_friend?character_id=5428013610422131937';
    return Query.APIURL + queryBody + callbackString;
}

function getCharactersQuery(characterIDs) {
    const callbackString = '&callback=charactersLoad';
    const queryBody = 'character?character_id=' + characterIDs.join(',');
    return Query.APIURL + queryBody + callbackString;
}

function startFetchCharacters(characterIDs) {
    const characterQuery = getCharactersQuery(characterIDs);
    JSONP.loadData(characterQuery);
}

function charactersLoadCallback(data) {
    friendsLoadCallback(data.character_list);
}

// Must be on Window for JSONP to work
window.friendsLoad = (data) => {
    var characterIDs = data.characters_friend_list[0].friend_list
        .map((f) => f.character_id);
    startFetchCharacters(characterIDs);
};
window.charactersLoad = (data) => {
    charactersLoadCallback(data);
};

module.exports = Data;
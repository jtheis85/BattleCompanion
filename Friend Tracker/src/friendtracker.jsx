'use strict';

// External Dependencies
import React    from 'react';
import ReactDOM from 'react-dom';

// Code Dependencies
import Data         from './Data/Data.js';
import Router       from './Utilities/Router.js';
import HashListener from '../../Common/src/Utilities/HashListener.js';

// Component Dependencies
import FriendList from './Components/FriendList.jsx';
import CharacterSearch from './Components/CharacterSearch.jsx';

const appRootID = 'app-root';

// App initialization
const initialUserID = Router.initialize();
initializeUI(initialUserID);

// Update whenever a new ID is placed in the hash
HashListener.initialize((hash) => {
    const newUserID = Router.getRoute(hash);
    initializeUI(newUserID);
});

function RenderCharacterSearch() {
    ReactDOM.render(
        <CharacterSearch/>,
        document.getElementById(appRootID)
    );
};

const RenderFriendList = (friends) => {
    ReactDOM.render(
        <FriendList friends={friends}/>,
        document.getElementById(appRootID)
    );
};

// userId: e.g. '5428013610422131937'
function initializeUI(userId) {
    if(userId && userId != '') {
        initializeFriendList(userId);
    } else {
        RenderCharacterSearch();
    }
}

function initializeFriendList(userId) {
    Data.startFetchFriends(userId, (friends) => {
        RenderFriendList(friends);

        Data.onFriendLoginEvent(friends, (data) => {
            console.log(data);

            // TODO: Should probably use a hash map and index friends by id for faster access
            const friend = friends.filter((f) => f.id === data.id)[0];
            if(data.eventName === 'PlayerLogin')
                friend.status = '1';
            else if (data.eventName === 'PlayerLogout')
                friend.status = '0';

            RenderFriendList(friends);
        });
    });
}


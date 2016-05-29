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

const appRootID = 'app-root';

// App initialization
const initialUserId = Router.initialize();
initializeFriendList(initialUserId);

// Update whenever a new ID is placed in the hash
HashListener.initialize((hash) => {
    const newUserId = Router.getRoute(hash);
    initializeFriendList(newUserId);
});

const Render = (friends) => {
    ReactDOM.render(
        <FriendList friends={friends}/>,
        document.getElementById(appRootID)
    );
};

// userId: e.g. '5428013610422131937'
function initializeFriendList(userId) {
    Data.startFetchFriends(userId, (friends) => {
        Render(friends);

        Data.onFriendLoginEvent(friends, (data) => {
            console.log(data);

            // TODO: Should probably use a hash map and index friends by id for faster access
            const friend = friends.filter((f) => f.id === data.id)[0];
            if(data.eventName === 'PlayerLogin')
                friend.status = '1';
            else if (data.eventName === 'PlayerLogout')
                friend.status = '0';

            Render(friends);
        });
    });
}


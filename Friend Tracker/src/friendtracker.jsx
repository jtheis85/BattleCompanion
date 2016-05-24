"use strict";

import React    from 'react';
import ReactDOM from 'react-dom';

import Data from './Data/Data.js';

import FriendList from './Components/FriendList.jsx';

var messages = [];

const appRootID = 'app-root';

const Render = (friends) => {
    ReactDOM.render(
        <FriendList friends={friends}/>,
        document.getElementById(appRootID)
    );
};

Data.startFetchFriends('5428013610422131937', (friends) => {
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
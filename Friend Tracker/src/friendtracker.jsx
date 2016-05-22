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

Data.startFetchFriends((friends) => {
    Render(friends);
    
    Data.onFriendLoginEvent(friends, (data) => {
        console.log(data);

        Render(friends);
    });
});
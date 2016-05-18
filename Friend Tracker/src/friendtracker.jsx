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

Data.startFetchFriends((data) => {
    Render(data.characters_friend_list[0].friend_list);
});
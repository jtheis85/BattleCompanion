'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import FriendItem from './FriendItem.jsx';

const FriendList = ({friends}) => (
    <div>
        {friends.map((friend) => {
            return <FriendItem key={friend.character_id} friend={friend}/>;
        })}
    </div>
);

module.exports = FriendList;
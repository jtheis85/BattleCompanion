'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import FriendItem from './FriendItem.jsx';

const FriendList = ({friends}) => (
    <div className="friend-list">
        {friends.map((friend) => {
            return <FriendItem key={friend.id} friend={friend}/>;
        })}
    </div>
);

module.exports = FriendList;
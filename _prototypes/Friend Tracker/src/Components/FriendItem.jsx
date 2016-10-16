'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

const FriendItem = ({friend}) => (
    <div className={getClassName(friend)}>
        {friend.status === '0' ? '-' : 'o'} {friend.name} - {friend.lastLogin}
    </div>
);

function getClassName(friend) {
    var className = 'friend-item ';
    return className + (friend.status === '1' ? 'online' : 'offline');
}

module.exports = FriendItem;
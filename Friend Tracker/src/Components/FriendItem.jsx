'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

const FriendItem = ({friend}) => (
    <div>
        {friend.status === '0' ? '-' : 'o'} {friend.name} - {friend.lastLogin}
    </div>
);

module.exports = FriendItem;
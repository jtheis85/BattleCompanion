'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

const FriendItem = ({friend}) => (
    <div>
        {friend.character_id} - {friend.name.first}
    </div>
);

module.exports = FriendItem;
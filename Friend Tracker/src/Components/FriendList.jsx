'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import CharacterSearch from './CharacterSearch.jsx';

import FriendItem from './FriendItem.jsx';

const FriendList = ({friends}) => (
    <div>
        <CharacterSearch/>
        {friends.map((friend) => {
            return <FriendItem key={friend.id} friend={friend}/>;
        })}
    </div>
);

module.exports = FriendList;
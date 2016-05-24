'use strict';

import React from 'react';

const CharacterSearch = React.createClass({
    render: function() {
        return (
        <div>
            <label for="search">Character Name</label>
            <input name="search" type="text" value=""/>
            <input type="button" onclick={this._onSearchClick.bind(this)} value="Search"/>
        </div>
        );
    },
    _onSearchClick: (e) => {
        alert(e);
    }
});

export default CharacterSearch;
'use strict';

import React from 'react';

const CharacterSearch = React.createClass({
    render: function() {
        return (
        <div>
            <label for="search">Character Name</label>
            <input name="search" type="text"/>
            <input type="button" onClick={this._onSearchClick} value="Search"/>
        </div>
        );
    },
    _onSearchClick(e) {
        alert(e);
    }
});

export default CharacterSearch;
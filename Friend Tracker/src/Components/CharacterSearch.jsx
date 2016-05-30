'use strict';

import React from 'react';

import Data from '../Data/Data.js';

const CharacterSearch = React.createClass({
    getInitialState() {
        return {
            searchText: '',
            results: []
        }
    },
    render: function() {
        var searchResults;
        if(this.state.results.length > 0) {
            searchResults = this.state.results.map((r) => {
                const url = '#' + r.id;
                return <div><a href={url}>{r.name}</a></div>
            });
        } else {
            searchResults = '';
        }


        return (
        <div>
            <label for="search">Character Name</label>
            <input name="search" type="text" value={this.state.searchText} onChange={this._onSearchTextChange}/>
            <input type="button" onClick={this._onSearchClick} value="Search"/>
            {searchResults}
        </div>
        );
    },
    _onSearchTextChange(e) {
        this.setState({ searchText: e.target.value });
    },
    _onSearchClick(e) {
        Data.startFetchSearchResults(this.state.searchText, (results) => {
            this.setState({ results: results });
        });
    }
});

export default CharacterSearch;
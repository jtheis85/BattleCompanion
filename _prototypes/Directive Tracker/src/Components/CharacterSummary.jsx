'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');
var Data     = require('../Core/Data.js');

var CharacterSummary = React.createClass({
    displayName: 'character-summary',
    propTypes: {
        character: React.PropTypes.object.isRequired
    },
    render: function () {
        if(this.props.character.character_list && this.props.character.character_list.length > 0) {
            var ch = this.props.character.character_list[0];
            return (
                <div className="bc-character-summary">
                    <p>TITLE_ID[{ch.title_id}] {ch.name.first}</p>
                    <p>{Data.factions[ch.faction_id]}</p>
                    <p>BR {ch.battle_rank.value}</p>
                    <p>Unspent Certs: {ch.certs.available_points}</p>
                    <p>{Math.floor(ch.times.minutes_played/60)} Hours Played</p>
                </div>
            );

        } else {
            return (<div><p>Character data not loaded</p></div>);
        }

    }
});

module.exports = CharacterSummary;
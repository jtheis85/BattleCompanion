'use strict';

import React from 'react';

const FlakForecastApp = React.createClass({
    render() {
        const worlds = this.props.worlds
            ? this.props.worlds.map(world => {
                return <div>{world.name}</div>
            }) : null;
        return (
            <div>
                {worlds}
            </div>
        );
    }
});

export default FlakForecastApp;
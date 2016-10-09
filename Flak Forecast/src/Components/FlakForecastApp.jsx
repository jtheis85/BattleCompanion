'use strict';

import React from 'react';

const FlakForecastApp = React.createClass({
    render() {
        const {route, worlds} = this.props;
        const worldComponents = worlds ? this.props.worlds.map(world => {
                var className = 'nav-link' + (route && route.worldId === world.id ? ' _selected' : '');
                return <a key={world.id} className={className} href={'#' + world.id}>{world.name}</a>
            }) : null;
        return (
            <div>
                {worldComponents}
            </div>
        );
    }
});

export default FlakForecastApp;
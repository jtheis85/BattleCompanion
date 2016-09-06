'use strict';

import React from 'react';

const FlakForecastApp = React.createClass({
    render() {
        const {route, worlds} = this.props;
        const worldComponents = worlds && route ? this.props.worlds.map(world => {
                var className = 'nav-link' + (route.worldId === world.id ? ' _selected' : '');
                return <a className={className} href={'#' + world.id}>{world.name}</a>
            }) : null;
        return (
            <div>
                {worldComponents}
            </div>
        );
    }
});

export default FlakForecastApp;
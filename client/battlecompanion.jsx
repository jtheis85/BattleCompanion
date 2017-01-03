'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import Router from './utils/Router.js';

let currentRoute;

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {route, message} = this.props;
        const servers = ['Emerald', 'Connery', 'Cobalt', 'Miller', 'Briggs'];
        const factions = ['TR', 'NC', 'VS'];

        const routeFaction = route ? route.faction : '';
        const routeServer = route ? route.server : '';

        return (
            <div>
            <nav>
                <div className="bc-servers">
                    {
                        servers.map(server => (
                            <a href={`#${server}/${routeFaction}`}>{server}</a>
                        ))
                    }
                </div>
                <div className="bc-factions">
                    {
                        factions.map(faction => (
                            <a href={`#${routeServer}/${faction}`}>{faction}</a>
                        ))
                    }
                </div>
            </nav>
                <h1>{message}</h1>
            </div>
        );
    }
}

Router.initialize(route => {
    currentRoute = route;
    ReactDOM.render(<App route={route} message=""/>, document.getElementById('root'));
    let ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        ws.send(JSON.stringify({route: route}));
    };

    ws.onmessage = function (e) {
        ReactDOM.render(<App route={route} message={e.data}/>, document.getElementById('root'));
    };
});


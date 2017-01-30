'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import Router from './utils/Router.js';

import StatusCard from './components/StatusCard.jsx';
import {status} from './components/StatusCard.jsx';

let currentRoute;

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {route, current, previous} = this.props;
        const servers = ['Emerald', 'Connery', 'Cobalt', 'Miller', 'Briggs'];
        const factions = ['TR', 'NC', 'VS'];

        const routeFaction = route ? route.faction : undefined;
        const routeServer = route ? route.server : undefined;

        const currentCard = !current ? null : toCard(current, { animate: 'in'});
        const previousCard = !previous ? null : toCard(previous, { animate: 'out'});

        return (
            <div>
                    <nav>
                    <div className="bc-servers">
                        {
                            servers.map(server => {
                                const url = this._buildUrl(server, routeFaction, null);
                                return <a href={url}>{server}</a>;
                            })
                        }
                    </div>
                    <div className="bc-factions">
                        {
                            factions.map(faction => {
                                const url = this._buildUrl(routeServer, faction, null);
                                return <a href={url}>{faction}</a>;
                            })
                        }
                    </div>
                    <div className="bc-debug">
                        <a href={this._buildUrl(null, null, 'Debug')}>Debug</a>
                    </div>
                </nav>
                {currentCard}
                {current !== previous ? previousCard : null}
            </div>
        );
    }
    _buildUrl(server, faction, option) {
        let pieces = [];
        if(server) {
            pieces.push('s');
            pieces.push(server);
        }
        if(faction) {
            pieces.push('f');
            pieces.push(faction);
        }
        if(option) {
            pieces.push('o');
            pieces.push(option);
        }

        return `#${pieces.join('/')}`;
    }
}

function toCard(message, options) {
    if(message === 'high') {
        return <StatusCard className={options.animate} status={status.high} title="High AA Activity!">
            <p>High anti-air activity has been detected on your continent!</p>
        </StatusCard>;
    } else {
        return <StatusCard className={options.animate} status={status.low} title="Low AA Activity">
            <p>The skies on your continent are clear. Carry on, pilot!</p>
        </StatusCard>;
    }
}

let current = {};
let previous = {};

Router.initialize(route => {
    currentRoute = route;
    ReactDOM.render(<App route={route} message=""/>, document.getElementById('root'));
    let ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        ws.send(JSON.stringify({route: route}));
    };

    ws.onmessage = function (e) {
        previous = current;
        current = e.data;
        ReactDOM.render(<App route={route} current={current} previous={previous}/>, document.getElementById('root'));
    };
});


'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import { Alert } from 'react-bootstrap';

var App = () => (
    <div>
        <h1>Battle Companion!</h1>
        <select className="form-control">
            <option>Amerish</option>
            <option>Esamir</option>
            <option>Hossin</option>
            <option>Indar</option>
        </select>
        <select className="form-control">
            <option>Infantry</option>
            <option>Ground Vehicle</option>
            <option>Air Vehicle</option>
        </select>
        <input className="form-control" type="text" value="Character"/>
        <button className="btn btn-default">Go</button>
        <div className="row">
            <div className="col-md-4">
                <h2>TR</h2>
                <Alert bsStyle="success">
                    Minimal AA
                </Alert>
                <Alert bsStyle="info">
                    Light AA
                </Alert>
                <Alert bsStyle="warning">
                    Moderate AA!
                </Alert>

            </div>
            <div className="col-md-4">
                <h2>NC</h2>
                <Alert bsStyle="danger">
                    Heavy AA!
                    <span className="badge"><span className="glyphicon glyphicon-time"></span>1:32</span>
                </Alert>
            </div>
            <div className="col-md-4">
                <h2>VS</h2>
                <Alert bsStyle="success">
                    Heavy Friendly AA!
                </Alert>
            </div>
        </div>
    </div>
);

ReactDOM.render(<App/>, document.getElementById('root'));
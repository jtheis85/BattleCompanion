"use strict";

import React    from 'react';
import ReactDOM from 'react-dom';
import API      from './API.js';

import { Button }       from 'react-bootstrap/lib';
import { Form }         from 'react-bootstrap/lib';
import { FormGroup }    from 'react-bootstrap/lib';
import { ControlLabel } from 'react-bootstrap/lib';
import { FormControl }  from 'react-bootstrap/lib';

const appRootID = 'app-root';
const query = '{"service":"event","action":"subscribe","worlds":["17"],"eventNames":["PlayerLogin","PlayerLogout"]}';
var messages = [];

const AutoComplete = () => (
    <Form inline>
        <FormGroup>
            <ControlLabel>Search by Name</ControlLabel>
            {' '}
            <FormControl
                type="text"
                placeholder="Higby"
            />
        </FormGroup>
        {' '}
        <Button bsStyle="primary">Friend Tracker!</Button>
        <div>
            {messages.map((message) => {
                return <h1>{message}</h1>;
            })}
        </div>
    </Form>

);

const Render = () => {
    ReactDOM.render(
        <AutoComplete/>,
        document.getElementById(appRootID)
    );
};

API.connect((data) => {
    if(data.payload) {
        var message = data.payload.character_id + ' ' + data.payload.event_name;
        messages.push(message);
        Render();
    }
},query);
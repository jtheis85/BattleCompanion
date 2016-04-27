"use strict";

import React    from 'react';
import ReactDOM from 'react-dom';

import { Button }       from 'react-bootstrap/lib';
import { Form }         from 'react-bootstrap/lib';
import { FormGroup }    from 'react-bootstrap/lib';
import { ControlLabel } from 'react-bootstrap/lib';
import { FormControl }  from 'react-bootstrap/lib';

const appRootID = 'app-root';

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
    </Form>
);

ReactDOM.render(
    <AutoComplete/>,
    document.getElementById(appRootID)
);

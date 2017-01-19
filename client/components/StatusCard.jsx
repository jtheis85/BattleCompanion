'use strict';

import React from 'react';
import Icon from './Icon.jsx';

class StatusCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {icon, title, children} = this.props;
        return (
            <div className="bc-status-card _warning">
                <h1><Icon className="_warning" icon={icon}/>{title}</h1>
                {children}
            </div>
        );
    }
}

export default StatusCard;
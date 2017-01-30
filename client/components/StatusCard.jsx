'use strict';

import React from 'react';
import Icon from './Icon.jsx';

class StatusCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {status, title, className, children} = this.props;
        const statusClass = getCssClass(status);
        return (
            <div className={`bc-status-card ${statusClass} ${className}`}>
                <h1>
                    <Icon
                        className={statusClass}
                        icon={getGlyph(status)}
                    />
                    {title}
                </h1>
                {children}
            </div>
        );
    }
}

function getCssClass(statusProp) {
    switch (statusProp) {
        case status.high:
            return '_high';
        case status.low:
            return '_low';
        default:
            throw new Error(`Unrecognized status: ${statusProp}`);
    }
}

function getGlyph(statusProp) {
    switch (statusProp) {
        case status.high:
            return 'alert';
        case status.low:
            return 'cloud';
        default:
            throw new Error(`Unrecognized status: ${statusProp}`);
    }
}

const status = {
    high: 'STATUS_HIGH',
    low: 'STATUS_LOW'
};

export { StatusCard as default, status };
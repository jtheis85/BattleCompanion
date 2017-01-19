'use strict';

import React from 'react';

const Icon = ({className, icon}) => (
    <span className={`${className} bc-icon glyphicon glyphicon-${icon}`}></span>
);

export default Icon;


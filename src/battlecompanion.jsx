'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');
var App      = require('./Components/App.jsx');

window.renderApp = function () {
    ReactDOM.render(
        <App
            character               = {window.data.character}
            directiveTreeCategories = {window.data.directiveTreeCategories}
            directiveTrees          = {window.data.directiveTrees}
            directiveTiers          = {window.data.directiveTiers}
            directives              = {window.data.directives}
        />,
        document.getElementById('app-root')
    );
}



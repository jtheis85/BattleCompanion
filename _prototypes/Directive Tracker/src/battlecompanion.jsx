'use strict';

var React     = require('react');
var ReactDOM  = require('react-dom');
//var App       = require('./Components/App.jsx');
var DataStore = require('./Data/DataStore.js');

(function startApplication(){
    DataStore.initialize(
        renderApp
    );
})();

function renderApp() {

    var categories = DataStore.getCategories().directive_tree_category_list
        .map(function(category) {
            return <div>{category.name.en}</div>
        });

    var trees = DataStore.getTrees(7, renderApp);

    if (!trees)
        trees = 'No Trees!';
    else {
        trees = trees.map(function(tree) {
           return <div>{tree.name.en}</div>
        });
    }

    ReactDOM.render(
        <div>
            {categories}
            {trees}
        </div>,
        //<App
            //character               = {window.data.character}
            //directiveTreeCategories = {window.data.directiveTreeCategories}
            //directiveTrees          = {window.data.directiveTrees}
            //directiveTiers          = {window.data.directiveTiers}
            //directives              = {window.data.directives}
        ///>,
        document.getElementById('app-root')
    );
};



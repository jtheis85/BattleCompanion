'use strict';

var React            = require('react');
var ReactDOM         = require('react-dom');
var CharacterSummary = require('./CharacterSummary.jsx');
var DirectiveTree    = require('./DirectiveTree.jsx');
var DirectiveTreeNav = require('./DirectiveTreeNav.jsx');

var App = React.createClass({
    getInitialState: function() {
        return {
            selected: -1
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var prevCategories = this.props.directiveTreeCategories;
        var nextCategories = nextProps.directiveTreeCategories;

        // Categories were invalid but no longer are
        if(!this._isValid(prevCategories) && this._isValid(nextCategories)) {
            // Select the first category, whatever it is
            this.setState({
                selected: nextCategories.directive_tree_category_list[0].directive_tree_category_id
            });
        }
    },
    render: function() {
        var categories = [];
        var directiveTree = {};

        if(this._isValid(this.props.directiveTreeCategories)) {
            categories = this.props.directiveTreeCategories.directive_tree_category_list;
        }

        if(this.state.selected !== -1) {
            directiveTree = <DirectiveTree
                directiveTreeCategories = {categories.filter(function(category){
                    return category.directive_tree_category_id === this.state.selected;
                }.bind(this))}
                directiveTrees = {this.props.directiveTrees}
                directiveTiers = {this.props.directiveTiers}
                directives     = {this.props.directives}
            />
        } else { directiveTree = <text></text>;}

        return (
            <div>
                <h1>Battle Companion</h1>
                <hr/>
                <CharacterSummary character = {this.props.character}/>
                <hr/>
                <DirectiveTreeNav
                    categories         = {categories}
                    selected           = {this.state.selected}
                    onSelectionChanged = {this._selectionChanged}
                />
                {directiveTree}
            </div>
        );
    },
    _selectionChanged: function(selection) {
        this.setState({
            selected: selection
        });
    },
    _isValid: function(categories) {
        return (
            // Not null or empty
            categories &&
            // Has the expected property from the API
            categories.directive_tree_category_list &&
            // Has items in it
            categories.directive_tree_category_list.length > 0
        );
    }
});

module.exports = App;
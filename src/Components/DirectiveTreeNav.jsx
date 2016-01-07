'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');

var DirectiveTreeNav = React.createClass({
    displayName: 'directive-tree-nav',
    render: function () {
        var categories = this.props.categories;
        var categoryButtons = {};

        if(categories.length > 0) {
            categoryButtons = categories.map(function(category) {
                var catID = category.directive_tree_category_id;
                return (
                    <button
                        className = { this.props.selected ===  catID ? '_selected' : ''}
                        onClick={this._navigate.bind(null, catID)}>

                        {category.name.en}
                    </button>
                )
            }.bind(this));
        } else return (<text></text>);

        return (
            <div className="bc-directive-tree-nav">
                {categoryButtons}
            </div>
        );
    },

    _navigate: function (category_id, e) {
        this.props.onSelectionChanged(category_id);
    }
});

module.exports = DirectiveTreeNav;
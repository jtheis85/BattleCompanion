'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');

var DirectiveTree = React.createClass({
    displayName: 'directive-tree',
    render: function() {
        var directiveDisplay;
        var dirTrees    = this.props.directiveTrees;
        var dirTiers    = this.props.directiveTiers;
        var dirs        = this.props.directives;

        // Make sure we have the data first!
        if(this.props.directiveTreeCategories &&
           dirTrees   && dirTrees.directive_tree_list && dirTrees.directive_tree_list.length > 0 &&
           dirTiers   && dirTiers.directive_tier_list && dirTiers.directive_tier_list.length > 0 &&
           dirs       && dirs.directive_list          && dirs.directive_list         .length > 0) {

            // Build the directive tree categories
            directiveDisplay = this.props.directiveTreeCategories.map(function(dirCat) {

                // Build the trees within each category
                var trees = dirTrees.directive_tree_list.filter(function(dirTree) {
                    return dirTree.directive_tree_category_id === dirCat.directive_tree_category_id;
                }).map(function(dirTree) {

                    // Build the tiers within each tree
                    var tiers = dirTiers.directive_tier_list.filter(function(dirTier) {
                        return dirTier.directive_tree_id === dirTree.directive_tree_id;
                    }).map(function (dirTier) {

                        // Build the individual directives within each tier
                        var directives = dirs.directive_list.filter(function(dir) {
                            return dir.directive_tier_id === dirTier.directive_tier_id &&
                                   dir.directive_tree_id === dirTree.directive_tree_id;
                        }).map(function (dir) {
                            return (<p>{dir.name.en}</p>);
                        });
                        return (
                            <div>
                                <h4>{dirTier.name.en}</h4>
                                {directives}
                            </div>
                        );
                    });
                    return (
                        <div>
                            <h3>{dirTree.name.en}</h3>
                            {tiers}
                        </div>
                    );
                });

                return (
                    <div>
                        <h2>{dirCat.name.en}</h2>
                        {trees}
                    </div>
                );
            });
        } else {
            directiveDisplay = (<p>Directives not loaded.</p>);
        }

        return (<div className="bc-directive-tree">{directiveDisplay}</div>);
    }
});

module.exports = DirectiveTree;

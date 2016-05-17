// Category
// - Tree
//  - Tier
//   - Directive

// Query to get the category/tree/tier structure
// There's a lot of directives so leave them out for now and look them up on demand
// Also only look up player progress as needed

'use strict';

// Dependencies
var queryURL = require('../../../Common/src/API/Query.js').APIURL;
var JSONP    = require('../Utilities/JSONP.js');

// Private Data
var categoryCallback;
var treesCallback;

// Module API
var Directive = {
    startFetchCategoryData: function (callback) {
        var categoryQuery = getCategoryQuery();
        JSONP.loadData(categoryQuery);
        categoryCallback = callback;
    },
    startFetchTreeData: function (callback, categoryID) {
        var treeQuery = getTreesQuery(categoryID)
        JSONP.loadData(treeQuery);
        treesCallback = callback;
    }
};

function getCategoryQuery() {
    return queryURL + 'directive_tree_category?c:limit=50&callback=directiveTreeCategoryLoad';
}

function getTreesQuery(categoryID) {
    return queryURL +
        'directive_tree?directive_tree_category_id=' + categoryID +
        '&c:limit=50&callback=directiveTreesLoad';
}

// Must be on window for JSONP to work
window.directiveTreeCategoryLoad = function (data) {
    categoryCallback(data);
};
window.directiveTreesLoad = function (data) {
    treesCallback(data);
};

module.exports = Directive;


//var characterUrl             = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/character?character_id=5428013610422131937&callback=characterLoad';
//
//var directiveTreeCategoryUrl = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tree_category?c:limit=100&callback=directiveTreeCategoryLoad';
//var directiveTreeUrl         = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tree?c:limit=100&callback=directiveTreeLoad';
//var directiveTierUrl         = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tier?c:limit=500&callback=directiveTierLoad';
//var directiveUrl             = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive?c:limit=5000&callback=directiveLoad';
//
//var query = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/characters_directive?character_id=5428013610422131937c:limit=10&' +
//    'c:join=directive^inject_at:directive^list:1,' +
//    'directive_tree^inject_at:tree^list:1,' +
//    'characters_directive_objective^inject_at:objective^list:1^on:directive_id^to:directive_id' +
//    '&c:lang=en';
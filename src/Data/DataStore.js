'use strict';

var Directive = require('../API/Directive.js');

// Private data
//var data = {
//    //character: {},
//    directiveTreeCategories: {}//,
//    //directiveTrees: {},
//    //directiveTiers: {},
//    //directives: {}
//};

var directiveTreeCategories = {};
var directiveTrees = [];
var loadedTreesCategoryID = -1;

var initializedCallback;

var DataStore = {
    initialize: function (callback) {
        Directive.startFetchCategoryData(
            loadCategoryData
        );

        initializedCallback = callback;
    },
    getCategories: function () {
        return directiveTreeCategories;
    },
    getTrees: function (categoryID, callback) {
        // Check to see if we have the data yet
        if (haveDataFor(categoryID)) {
            return directiveTrees;
        } else {
            // Get the data asynchronously from the server and notify
            // the caller when it is ready
            Directive.startFetchTreeData(
                loadTreeData.bind(null, callback, categoryID),
                categoryID
            );

            // TEMP: Special value indicating data isn't ready
            return null;
        }
    }
};

// TEMP: Only keeping 1 category's trees at a time
function haveDataFor(categoryID) {
    if(loadedTreesCategoryID !== categoryID)
        return false;
    else return true;
}

function loadCategoryData(data) {
    directiveTreeCategories = data;
    initializedCallback();
}

function loadTreeData(callback, categoryID, data) {
    // Store the data
    directiveTrees = data.directive_tree_list;

    // Note which category we've stored data for
    loadedTreesCategoryID = categoryID;

    // Notify the caller that the tree data has loaded
    callback();
}

module.exports = DataStore;

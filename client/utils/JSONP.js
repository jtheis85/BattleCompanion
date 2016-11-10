'use strict';

var JSONP = {
    loadData: function (url) {
        // Create the script node
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = url;

        // Place the script in the page to execute and retrieve data
        document.body.appendChild(script);
    }
};

module.exports = JSONP;


//function characterLoad(data) {
//    window.data.character = data;
//    renderApp();
//}
//
//function directiveTreeCategoryLoad(data) {
//    window.data.directiveTreeCategories = data;
//    // Don't load trees until categories are loaded
//    loadData(directiveTreeUrl);
//}
//
//function directiveTreeLoad(data) {
//    window.data.directiveTrees = data;
//    // Don't load tiers until trees are loaded
//    loadData(directiveTierUrl);
//}
//
//function directiveTierLoad(data) {
//    window.data.directiveTiers = data;
//    loadData(directiveUrl);
//}
//
//function directiveLoad(data) {
//    window.data.directives = data;
//    renderApp();
//}
//
//loadData(characterUrl);
//// Kick off the load chain
//loadData(directiveTreeCategoryUrl);
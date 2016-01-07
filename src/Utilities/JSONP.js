// Store everything here for now
window.data = {
    character: {},
    directiveTreeCategories: {},
    directiveTrees: {},
    directiveTiers: {},
    directives: {}
};

var characterUrl             = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/character?character_id=5428013610422131937&callback=characterLoad';

var directiveTreeCategoryUrl = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tree_category?c:limit=100&callback=directiveTreeCategoryLoad';
var directiveTreeUrl         = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tree?c:limit=100&callback=directiveTreeLoad';
var directiveTierUrl         = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive_tier?c:limit=500&callback=directiveTierLoad';
var directiveUrl             = 'http://census.soe.com/s:Sq7FtUG1mfsn/get/ps2/directive?c:limit=5000&callback=directiveLoad';

function loadData(url) {
    // Create the script node
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = url;

    // Place the script in the page to execute and retrieve data
    document.body.appendChild(script);
}

function characterLoad(data) {
    window.data.character = data;
    renderApp();
}

function directiveTreeCategoryLoad(data) {
    window.data.directiveTreeCategories = data;
    // Don't load trees until categories are loaded
    loadData(directiveTreeUrl);
}

function directiveTreeLoad(data) {
    window.data.directiveTrees = data;
    // Don't load tiers until trees are loaded
    loadData(directiveTierUrl);
}

function directiveTierLoad(data) {
    window.data.directiveTiers = data;
    loadData(directiveUrl);
}

function directiveLoad(data) {
    window.data.directives = data;
    renderApp();
}

loadData(characterUrl);
// Kick off the load chain
loadData(directiveTreeCategoryUrl);
'use strict';

var onHashChangeCallback;

var HashListener = {
    initialize(callback) {
        onHashChangeCallback = callback;

        // Mustn't use an anonymous function here, otherwise we will be unable
        // to remove it later
        window.addEventListener('hashchange', onHashChange);
    },
    dispose() {
        window.removeEventListener('hashchange', onHashChange);
    }
};

function onHashChange() {
    onHashChangeCallback(location.hash);
}

module.exports = HashListener;
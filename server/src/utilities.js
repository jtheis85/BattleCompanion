"use strict";

export default {
    augmentArray() {
        Object.defineProperty(Array.prototype, 'sum', {
            enumerable: false,
            value: function (predicate) {
                return this.reduce((sum, item) => predicate(item) ? sum + 1 : sum, 0);
            }
        });

        Object.defineProperty(Array.prototype, 'remove', {
            enumerable: false,
            value: function (predicate) {
                // Look for the item
                const index = this.findIndex(predicate);
                // Item found
                if(index > -1) {
                    // Remove the item
                    this.splice(index, 1);
                    // Item removed
                    return true;
                }
                // Item not removed
                return false;
            }
        });
    }
};
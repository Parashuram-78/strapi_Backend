'use strict';

/**
 * Custom sub-category router.
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/sub-categories/by-category/:categoryId',
            handler: 'sub-category.findByCategory',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
}; 
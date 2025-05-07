'use strict';

/**
 * `subcategory-filter` middleware
 */

module.exports = (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
        // If this is a relation field request for subcategories
        if (ctx.request.url.includes('/api/subcategories') &&
            ctx.request.url.includes('relation=true')) {
            // Continue to the next middleware
            await next();

            // After the original response, let's filter it
            if (ctx.response.body && ctx.response.body.results) {
                // Get the category ID from the query params if it exists
                const categoryId = ctx.query.categoryId;

                if (categoryId) {
                    // Filter subcategories by category
                    ctx.response.body.results = ctx.response.body.results.filter(
                        item => item.category && item.category.id.toString() === categoryId.toString()
                    );

                    // Also update the count
                    ctx.response.body.pagination.total = ctx.response.body.results.length;
                }
            }
        } else {
            // Continue for other requests
            await next();
        }
    };
}; 
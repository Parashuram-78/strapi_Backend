'use strict';

/**
 * sub-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sub-category.sub-category', ({ strapi }) => ({
    async find(params) {
        // Check if this is an admin request for blog editing
        const ctx = strapi.requestContext.get();
        const referer = ctx?.request?.header?.referer || '';
        const isBlogEdit = referer.includes('/content-manager/collectionType/api::blog.blog');

        // If this is a blog edit and we have no category filter, try to add one
        if (isBlogEdit && (!params.filters || !params.filters.category)) {
            console.log('[SubCategory Service] Blog edit detected, checking for category filter');

            // Extract blog ID from referer
            const blogIdMatch = referer.match(/\/(\d+)$/);
            const blogId = blogIdMatch ? blogIdMatch[1] : null;

            if (blogId) {
                try {
                    // Get blog categories
                    const blog = await strapi.entityService.findOne('api::blog.blog', blogId, {
                        populate: ['categories']
                    });

                    if (blog?.categories?.length > 0) {
                        const categoryIds = blog.categories.map(cat => cat.id);
                        console.log(`[SubCategory Service] Found categories: ${categoryIds.join(', ')}`);

                        // Add category filter to params
                        if (!params.filters) {
                            params.filters = {};
                        }

                        params.filters.category = {
                            id: {
                                $in: categoryIds
                            }
                        };

                        console.log('[SubCategory Service] Updated params:', JSON.stringify(params.filters));
                    }
                } catch (error) {
                    console.error(`[SubCategory Service] Error getting blog ${blogId}:`, error);
                }
            }
        }

        // Call the original method with potentially modified params
        return await super.find(params);
    }
})); 
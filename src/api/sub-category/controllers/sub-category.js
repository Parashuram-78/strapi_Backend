'use strict';

/**
 * sub-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sub-category.sub-category', ({ strapi }) => ({
    // Standard find method with enhanced filtering
    async find(ctx) {
        // Get the referer to check if we're in a blog edit context
        const referer = ctx.request.header.referer || '';
        const isBlogEdit = referer.includes('/content-manager/collectionType/api::blog.blog');

        if (isBlogEdit) {
            // Try to extract the blog ID
            const blogIdMatch = referer.match(/\/(\d+)(?:\/|$)/);
            const blogId = blogIdMatch ? blogIdMatch[1] : null;

            if (blogId) {
                try {
                    // Get the blog with its categories
                    const blog = await strapi.entityService.findOne('api::blog.blog', blogId, {
                        populate: ['categories']
                    });

                    // If there are categories, filter subcategories
                    if (blog?.categories?.length > 0) {
                        const categoryIds = blog.categories.map(cat => cat.id);

                        // Add filter to the query
                        if (!ctx.query.filters) {
                            ctx.query.filters = {};
                        }

                        ctx.query.filters.category = {
                            id: {
                                $in: categoryIds
                            }
                        };

                        console.log('[Controller] Filtering subcategories by categories:', categoryIds);
                    }
                } catch (error) {
                    console.error('[Controller] Error filtering subcategories:', error);
                }
            }
        }

        // Call the parent implementation with our potentially modified query
        return await super.find(ctx);
    },

    // Get subcategories filtered by category
    async findByCategory(ctx) {
        try {
            const { categoryId } = ctx.params;
            console.log('[SubCategory Controller] findByCategory called with categoryId:', categoryId);

            if (!categoryId) {
                return ctx.badRequest('Category ID is required');
            }

            // Find subcategories that belong to the specified category
            const entities = await strapi.db.query('api::sub-category.sub-category').findMany({
                where: {
                    category: categoryId
                },
                populate: ['category']
            });

            console.log(`[SubCategory Controller] Found ${entities.length} subcategories for category ${categoryId}`);

            // Format the response to match Strapi's standard format
            const sanitizedEntities = await this.sanitizeOutput(entities, ctx);

            return this.transformResponse(sanitizedEntities);
        } catch (error) {
            console.error('[SubCategory Controller] Error in findByCategory:', error);
            return ctx.internalServerError('An error occurred while retrieving subcategories');
        }
    }
}));

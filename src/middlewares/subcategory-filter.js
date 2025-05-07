module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        // Only intercept subcategory requests in the admin UI
        if (
            ctx.method === 'GET' &&
            ctx.url.includes('/api/sub-categories') &&
            ctx.request.header.referer &&
            ctx.request.header.referer.includes('/admin')
        ) {
            try {
                // Get the referer to check if we're editing a blog
                const referer = ctx.request.header.referer;
                const isBlogEdit = referer.includes('/content-manager/collectionType/api::blog.blog');

                if (isBlogEdit) {
                    // Try to extract the blog ID
                    const blogIdMatch = referer.match(/\/(\d+)(?:\/|$)/);
                    const blogId = blogIdMatch ? blogIdMatch[1] : null;

                    if (blogId) {
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

                            console.log('[Middleware] Filtering subcategories by categories:', categoryIds);
                        }
                    }
                }
            } catch (error) {
                console.error('[Middleware] Error filtering subcategories:', error);
            }
        }

        await next();
    };
}; 
//@ts-nocheck
'use strict';

/**
 * comment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comment.comment', ({ strapi }) => ({
    // Custom service methods
    async findByBlog(blogId, visibilityStatusComment = 'approved') {
        return strapi.db.query('api::comment.comment').findMany({
            where: {
                blog: blogId,
                visibilityStatusComment
            },
            orderBy: { createdAt: 'desc' }
        });
    }
})); 
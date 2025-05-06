//@ts-nocheck
'use strict';

/**
 * comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
    async find(ctx) {
        try {
            // Only apply the approved filter for public API requests
            // Skip for admin panel requests
            const isAdminPanel = ctx.request.url.includes('/admin/');

            if (!isAdminPanel && (!ctx.query.filters || !ctx.query.filters.visibilityStatusComment)) {
                ctx.query = {
                    ...ctx.query,
                    filters: {
                        ...ctx.query.filters,
                        visibilityStatusComment: 'approved'
                    }
                };
            }

            const { data, meta } = await super.find(ctx);
            return { data, meta };
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async create(ctx) {
        try {
            // Validate required fields
            const { authorName, authorEmail, content } = ctx.request.body.data;
            if (!authorName || !authorEmail || !content) {
                return ctx.badRequest('Missing required fields');
            }

            // Set visibilityStatusComment to pending by default if not provided
            if (!ctx.request.body.data.visibilityStatusComment) {
                ctx.request.body.data.visibilityStatusComment = 'pending';
            }

            // Validate visibilityStatusComment value
            const validStatuses = ['pending', 'approved', 'rejected'];
            if (!validStatuses.includes(ctx.request.body.data.visibilityStatusComment)) {
                ctx.request.body.data.visibilityStatusComment = 'pending';
            }

            const response = await super.create(ctx);
            return response;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const data = ctx.request.body.data;

            // For regular updates, proceed normally
            return super.update(ctx);
        } catch (error) {
            console.error('Comment update error:', error);
            ctx.throw(500, error.message || 'Internal server error');
        }
    },

    // Custom method to get comments for a specific blog
    async findByBlog(ctx) {
        try {
            const { id } = ctx.params;
            const { visibilityStatusComment = 'approved' } = ctx.query;

            // Validate status value
            const validStatuses = ['pending', 'approved', 'rejected'];
            const actualStatus = validStatuses.includes(visibilityStatusComment) ? visibilityStatusComment : 'approved';

            const comments = await strapi.db.query('api::comment.comment').findMany({
                where: {
                    blog: id,
                    visibilityStatusComment: actualStatus
                },
                orderBy: { createdAt: 'desc' },
            });

            const sanitizedComments = await this.sanitizeOutput(comments, ctx);
            return this.transformResponse(sanitizedComments);
        } catch (error) {
            ctx.throw(500, error);
        }
    }
}));
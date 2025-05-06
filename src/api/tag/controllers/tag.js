//@ts-nocheck
'use strict';

/**
 * tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tag.tag', ({ strapi }) => ({
    async find(ctx) {
        try {
            const tags = await strapi.service('api::tag.tag').findWithBlogCount(ctx.query);
            const sanitizedTags = await this.sanitizeOutput(tags, ctx);
            return this.transformResponse(sanitizedTags);
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async findOne(ctx) {
        try {
            const { id } = ctx.params;
            const tag = await strapi.service('api::tag.tag').findOneWithBlogs(id, ctx.query);
            const sanitizedTag = await this.sanitizeOutput(tag, ctx);
            return this.transformResponse(sanitizedTag);
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async create(ctx) {
        try {
            const { name } = ctx.request.body.data;
            if (!name) {
                return ctx.badRequest('Name is required');
            }
            const response = await super.create(ctx);
            return response;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async update(ctx) {
        try {
            const response = await super.update(ctx);
            return response;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const hasBlogs = await strapi.service('api::tag.tag').checkBlogAssociations(id);

            if (hasBlogs) {
                return ctx.badRequest('Cannot delete tag with existing blogs');
            }

            const response = await super.delete(ctx);
            return response;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async getPopular(ctx) {
        try {
            const { limit } = ctx.query;
            const tags = await strapi.service('api::tag.tag').findPopular(limit);
            const sanitizedTags = await this.sanitizeOutput(tags, ctx);
            return this.transformResponse(sanitizedTags);
        } catch (error) {
            ctx.throw(500, error);
        }
    }
})); 
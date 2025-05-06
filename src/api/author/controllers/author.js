'use strict';

/**
 *  author controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::author.author', ({ strapi }) => ({
    // Extend the core controller to add custom methods
    async find(ctx) {
        // Call the default find method
        const { data, meta } = await super.find(ctx);
        
        // Return the response
        return { data, meta };
    },

    async findOne(ctx) {
        // Get the ID from params
        const { id } = ctx.params;
        
        // Call the default findOne method
        const response = await super.findOne(ctx);
        
        // Get author's blogs with basic info
        const blogs = await strapi.db.query('api::blog.blog').findMany({
            where: { author: id },
            select: ['id', 'heading', 'slug', 'publishDate'],
            orderBy: { publishDate: 'desc' }
        });
        
        // Add blogs to the response
        response.data.attributes.blogs = blogs;
        
        return response;
    },

    async create(ctx) {
        // Validate required fields
        const { name, email, photo } = ctx.request.body.data;
        if (!name || !email || !photo) {
            return ctx.badRequest('Missing required fields');
        }

        // Create the author
        const response = await super.create(ctx);
        return response;
    },

    async update(ctx) {
        // Call the default update method
        const response = await super.update(ctx);
        return response;
    },

    async delete(ctx) {
        // Check if author has any blogs
        const { id } = ctx.params;
        const blogs = await strapi.db.query('api::blog.blog').findMany({
            where: { author: id }
        });

        if (blogs.length > 0) {
            return ctx.badRequest('Cannot delete author with existing blogs');
        }

        // Call the default delete method
        const response = await super.delete(ctx);
        return response;
    }
}));

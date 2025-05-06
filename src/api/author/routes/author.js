'use strict';

/**
 * author router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::author.author', {
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: []
        },
        findOne: {
            auth: false,
            policies: [],
            middlewares: []
        },
        create: {
            auth: { scope: ['api::author.author.create'] },
            policies: []
        },
        update: {
            auth: { scope: ['api::author.author.update'] },
            policies: []
        },
        delete: {
            auth: { scope: ['api::author.author.delete'] },
            policies: []
        }
    }
});

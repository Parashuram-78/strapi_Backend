'use strict';

module.exports = () => ({
    register({ strapi }) {
        // Register the plugin properly
        strapi.customFields.register({
            name: 'subcategory',
            plugin: 'blog-select',
            type: 'json',
        });
    },
    bootstrap(/*{ strapi }*/) { },
});
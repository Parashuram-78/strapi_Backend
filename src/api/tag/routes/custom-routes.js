'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/api/tags/popular',
            handler: 'api::tag.tag.getPopular',
            config: { auth: false }
        }
    ]
}; 
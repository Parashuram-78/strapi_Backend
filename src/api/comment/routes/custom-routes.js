'use strict';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/api/blogs/:id/comments',
            handler: 'api::comment.comment.findByBlog',
            config: { auth: false }
        }
    ]
}; 
module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/api/subcategories-by-category/:categoryId',
            handler: 'sub-category.findByCategory',
            config: {
                auth: false,
            }
        }
    ]
}; 
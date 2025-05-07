module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'ws:', 'wss:', 'localhost:*'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'localhost:*'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'localhost:*'],
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'localhost:*'],
          'frame-src': ["'self'", 'localhost:*'],
          'style-src': ["'self'", "'unsafe-inline'", 'localhost:*'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::subcategory-filter',
    config: {},
    resolve: './src/middlewares/subcategory-filter'
  },
];
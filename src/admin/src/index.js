// src/admin/src/index.js
import subcategoryField from './fields/subcategory-select';

export default {
    register(app) {
        app.customFields.register(subcategoryField);
    },
};

// src/admin/src/fields/subcategory-select/index.js
import SubcategorySelect from './SubcategorySelect';

export default {
  name: 'subcategory-select',
  type: 'relation',          // tells Strapi we store an ID
  Component: SubcategorySelect,
};

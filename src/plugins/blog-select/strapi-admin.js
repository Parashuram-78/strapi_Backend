import SubCategorySelect from '../../admin/src/fields/SubCategorySelect';

export default {
    register(app) {
        app.customFields.register({
            name: 'subcategory',
            pluginId: 'blog-select',
            type: 'json',
            intlLabel: { id: 'subcat.label', defaultMessage: 'Filtered Subcategories' },
            intlDescription: { id: 'subcat.desc', defaultMessage: 'Select subcategories filtered by category' },
            components: {
                Input: SubCategorySelect,
            },
        });
    }
}; 
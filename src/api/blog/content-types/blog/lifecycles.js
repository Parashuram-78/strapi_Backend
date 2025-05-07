// api/blog/content-types/blog/lifecycles.js
'use strict';

const mismatch = () => {
    throw new Error('Selected Sub‑category does not belong to chosen Category');
};

/**
 * Blog model lifecycles
 */
module.exports = {
    beforeFindMany(event) {
        console.log('[Blog Lifecycle] beforeFindMany hook called');
    },
    async beforeCreate(event) {
        await validate(event.params.data);
    },
    async beforeUpdate(event) {
        // First run validation
        await validate(event.params.data);

        const { data } = event.params;

        // Check if categories are being connected
        if (data.categories && data.categories.connect && data.categories.connect.length > 0) {
            console.log('[Blog Lifecycle] Categories being connected:', data.categories.connect);

            // Get the category IDs that are being connected
            const categoryIds = data.categories.connect.map(item => item.id);

            // If there are subcategories being connected, ensure they belong to the selected categories
            if (data.subcategories && data.subcategories.connect && data.subcategories.connect.length > 0) {
                try {
                    // Keep track of original count for logging
                    const originalCount = data.subcategories.connect.length;

                    // Get all subcategories that belong to the selected categories
                    const validSubcategories = await strapi.entityService.findMany('api::sub-category.sub-category', {
                        filters: {
                            category: {
                                id: {
                                    $in: categoryIds
                                }
                            }
                        }
                    });

                    // Extract the valid subcategory IDs
                    const validSubcategoryIds = validSubcategories.map(sub => sub.id);

                    // Filter out any subcategories that don't belong to the selected categories
                    data.subcategories.connect = data.subcategories.connect.filter(
                        sub => validSubcategoryIds.includes(sub.id)
                    );

                    console.log(`[Blog Lifecycle] Filtered subcategories from ${originalCount} to ${data.subcategories.connect.length}`);
                } catch (error) {
                    console.error('[Blog Lifecycle] Error filtering subcategories:', error);
                }
            }
        }
    }
};

async function validate(data) {
    if (!(data.category && data.subcategory)) return;
    const sub = await strapi.entityService.findOne(
        'api::subcategory.subcategory',
        data.subcategory,
        { populate: { category: true } }
    );
    if (!sub || sub.category?.id !== data.category) mismatch();
}

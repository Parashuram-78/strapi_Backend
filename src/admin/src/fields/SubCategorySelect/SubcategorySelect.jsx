import React, { useEffect, useState } from 'react';
import { Select, Option } from '@strapi/design-system/Select';
import { request, useCMEditViewDataManager } from '@strapi/helper-plugin';

const SubcategorySelect = ({ name, attribute }) => {
    const { modifiedData, onChange } = useCMEditViewDataManager();

    // 🟢 Handle both “object” and “number” cases
    const rawCategory = modifiedData.category ?? null;
    const categoryId = rawCategory && typeof rawCategory === 'object'
        ? rawCategory.id
        : rawCategory;

    const value = modifiedData[name] ?? null;
    const [options, setOptions] = useState([]);

    // Clear sub‑category if the category changes
    useEffect(() => {
        if (!categoryId && value) {
            onChange({ target: { name, value: null, type: 'select' } });
        }
    }, [categoryId]);

    // Fetch sub‑categories for the chosen category
    useEffect(() => {
        if (!categoryId) { setOptions([]); return; }

        request(
            `/content-manager/collection-types/api::subcategory.subcategory` +
            `?filters[category][id][$eq]=${categoryId}&fields=name&pagination[pageSize]=100`,
            { method: 'GET' }
        ).then(res => {
            // v5 returns .results; early v5.x uses .data
            const rows = res.results || res.data || [];
            setOptions(rows);
        });
    }, [categoryId]);

    return (
        <Select
            name={name}
            label={attribute?.label || 'Sub‑category'}
            placeholder={categoryId ? 'Select sub‑category' : 'Select Category first'}
            disabled={!categoryId}
            value={value}
            onChange={v => onChange({ target: { name, value: v, type: 'select' } })}
        >
            {options.map(o => (
                <Option key={o.id} value={o.id}>
                    {o.attributes?.name || o.name}
                </Option>
            ))}
        </Select>
    );
};

export default SubcategorySelect;

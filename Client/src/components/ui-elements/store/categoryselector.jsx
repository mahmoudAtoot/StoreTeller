import React from 'react';

const CategorySelector = () => {
    // Placeholder for categories
    const categories = ['Category 1', 'Category 2', 'Category 3'];

    return (
        <div className="mb-3">
            <label htmlFor="category-select" className="form-label">Category:</label>
            <select id="category-select" className="form-select">
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelector;

import React from 'react';
import styles from './categoryselector.module.css';

const CategorySelector = () => {
    // Placeholder for categories
    const categories = ['Category 1', 'Category 2', 'Category 3'];

    return (
        <div className={styles.container}>
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

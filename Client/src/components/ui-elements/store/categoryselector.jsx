import React, { useState } from 'react';
import styles from './categoryselector.module.css';

const CategorySelector = () => {
    const [activeCategory, setActiveCategory] = useState('Category 1');
    const categories = ['Category 1', 'Category 2', 'Category 3'];

    return (
        <div className={styles.categoryBar}>
            {categories.map(category => (
                <button
                    key={category}
                    className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;

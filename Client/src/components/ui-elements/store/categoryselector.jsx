import React, { useState, useEffect } from 'react';
import styles from './categoryselector.module.css';
import axios from 'axios';

const CategorySelector = ({ onSelectCategory }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [dynamicCategories, setDynamicCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/products/categories')
            .then(res => {
                setDynamicCategories(res.data);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    const categories = ['All', ...dynamicCategories];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (onSelectCategory) {
            onSelectCategory(category);
        }
    };

    return (
        <div className={styles.categoryBar}>
            {categories.map(category => (
                <button
                    key={category}
                    className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;

import React from 'react';
import styles from './iteminfoform.module.css';

const ItemInfoForm = ({ productInfo, setProductInfo }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={productInfo.name || ''} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={productInfo.price || ''} onChange={handleChange} step="0.01" />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={productInfo.category || ''} onChange={handleChange}>
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={productInfo.description || ''} onChange={handleChange}></textarea>
            </div>
        </form>
    );
};

export default ItemInfoForm;

import React, { useState, useEffect } from 'react';
import styles from './EditProductModal.module.css';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProduct);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" name="price" value={editedProduct.price} onChange={handleChange} step="0.01" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category" value={editedProduct.category} onChange={handleChange}>
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                        </select>
                    </div>
                    {/* Add fields for image and gif if they are editable */}
                    <div className={styles.modalActions}>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
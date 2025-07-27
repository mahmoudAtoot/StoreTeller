import React, { useState, useEffect } from 'react';
import styles from './EditProductModal.module.css';
import axios from 'axios';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
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
        onProductUpdated(editedProduct);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${product._id}`);
                alert('Product deleted successfully!');
                onClose();
                onProductUpdated(); // Trigger refresh in parent component
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product. Please try again.');
            }
        }
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
                        <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
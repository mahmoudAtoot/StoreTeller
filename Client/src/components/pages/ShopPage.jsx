import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import { Cashier } from '../ui-elements/store';
import EditProductModal from '../ui-elements/owner/EditProductModal'; // Import the new modal component
import styles from './ShopPage.module.css';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function ShopPage() {
    const { onProductClick } = useOutletContext();
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showEditModal, setShowEditModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const { isOwner, shopName: authShopName } = useAuth(); // Rename shopName from useAuth to avoid conflict
    const navigate = useNavigate();
    const { storename } = useParams(); // Get storename from URL

    const currentShopName = isOwner ? authShopName : storename; // Determine which shopName to use

    

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setProductToEdit(null);
    };

    const handleSaveEditedProduct = async (updatedProduct) => {
        try {
            await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
            // Optionally, re-fetch products or update state to reflect changes
            console.log('Product updated successfully!', updatedProduct);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product. Please try again.');
        }
    };

    const handleAddProductClick = () => {
        navigate('/add');
    };

    return (
        <div className={styles.shopPageContainer}>
            <div className={styles.mainContent}>
                <div className={styles.categoryAndAddButtonContainer}>
                    <div className={styles.categorySelectorWrapper}>
                        <CategorySelector onSelectCategory={setSelectedCategory} />
                    </div>
                    {isOwner && (
                        <button className={styles.addProductButton} onClick={handleAddProductClick}>
                            Add Product
                        </button>
                    )}
                </div>
                <ShelfContainer
                    onProductClick={onProductClick}
                    onProductHover={setHoveredProduct}
                    isOwner={isOwner}
                    selectedCategory={selectedCategory}
                    onEditClick={handleEditClick} // Pass the edit handler
                    shopName={currentShopName} // Pass the determined shopName to ShelfContainer
                />
            </div>
            <Cashier hoveredProduct={hoveredProduct} className={styles.cashierSection} />

            {showEditModal && productToEdit && (
                <EditProductModal
                    product={productToEdit}
                    onClose={handleCloseModal}
                    onSave={handleSaveEditedProduct}
                />
            )}
        </div>
    );
}

export default ShopPage;

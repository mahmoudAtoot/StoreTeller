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
    const [products, setProducts] = useState([]); // State to hold products

    const currentShopName = isOwner ? authShopName : storename; // Determine which shopName to use

    const fetchProducts = async () => {
        let url = '/api/products';
        if (currentShopName) {
            url += `?shopName=${currentShopName}`;
        }

        try {
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentShopName]); // Fetch all products when shopName changes

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);


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
            
            handleCloseModal();
            fetchProducts(); // Refresh products after successful edit
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
                    products={filteredProducts} // Pass the filtered products state
                />
            </div>
            <Cashier hoveredProduct={hoveredProduct} className={styles.cashierSection} />

            {showEditModal && productToEdit && (
                <EditProductModal
                    product={productToEdit}
                    onClose={handleCloseModal}
                    onProductUpdated={handleSaveEditedProduct}
                />
            )}
        </div>
    );
}

export default ShopPage;

import React, { useState, useEffect } from 'react';
import StoreShelf from './storeshelf';
import styles from './shelfcontainer.module.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const PRODUCTS_PER_SHELF = 5; // Define how many products per shelf

const ShelfContainer = ({ onProductClick, onProductHover, isOwner, selectedCategory, onEditClick, shopName: propShopName }) => {
    
    const [allProducts, setAllProducts] = useState([]);
    // const { shopName } = useAuth(); // No longer needed here

    useEffect(() => {
        let url = '/api/products';
        if (propShopName) {
            url += `?shopName=${propShopName}`;
        }

        if (selectedCategory && selectedCategory !== 'All') {
            url += `${propShopName ? '&' : '?'}category=${selectedCategory}`;
        }

        axios.get(url)
            .then(res => {
                setAllProducts(res.data);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
            });
    }, [propShopName, selectedCategory]);

    // Divide products into shelves, ensuring a fixed number of shelves are always rendered
    const NUM_SHELVES = 3; // Define a fixed number of shelves
    const shelves = [];
    for (let i = 0; i < NUM_SHELVES; i++) {
        const startIndex = i * PRODUCTS_PER_SHELF;
        const endIndex = startIndex + PRODUCTS_PER_SHELF;
        shelves.push(allProducts.slice(startIndex, endIndex));
    }

    const shelfHeights = [0, 150, 300]; // Example heights for 3 shelves

    return (
        <div className={styles.containerFluid}>
            {shelves.map((shelfProducts, index) => (
                <StoreShelf
                    key={index}
                    isOwner={isOwner}
                    onProductClick={onProductClick}
                    products={shelfProducts}
                    shelfHeight={shelfHeights[index] || 0} // Pass height to StoreShelf
                    onProductHover={onProductHover} // Pass onProductHover to StoreShelf
                    onEditClick={onEditClick} // Pass onEditClick to StoreShelf
                    productsPerShelf={PRODUCTS_PER_SHELF} // Pass PRODUCTS_PER_SHELF
                />
            ))}
        </div>
    );
};

export default ShelfContainer;

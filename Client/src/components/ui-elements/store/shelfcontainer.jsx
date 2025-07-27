import React, { useState, useEffect } from 'react';
import StoreShelf from './storeshelf';
import styles from './shelfcontainer.module.css';
import axios from 'axios';

const PRODUCTS_PER_SHELF = 5; // Define how many products per shelf

const ShelfContainer = ({ onProductClick, onProductHover, isOwner }) => {
    console.log('ShelfContainer: onProductClick prop:', onProductClick);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/store/products')
            .then(res => {
                console.log("API Response Data:", res.data);
                setAllProducts(res.data);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
            });
    }, []);

    // Divide products into shelves
    const shelves = [];
    for (let i = 0; i < allProducts.length; i += PRODUCTS_PER_SHELF) {
        shelves.push(allProducts.slice(i, i + PRODUCTS_PER_SHELF));
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
                />
            ))}
        </div>
    );
};

export default ShelfContainer;

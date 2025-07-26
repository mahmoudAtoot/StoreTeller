import React, { useState, useEffect } from 'react';
import StoreShelf from './storeshelf';
import styles from './shelfcontainer.module.css';

const PRODUCTS_PER_SHELF = 5; // Define how many products per shelf

const ShelfContainer = ({ isOwner, onProductClick, onProductHover }) => {
    console.log('ShelfContainer: onProductClick prop:', onProductClick);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        // Placeholder for fetching products
        // In a real application, you would fetch this data from an API
        const fetchedProducts = [
            { id: 1, name: 'Product A', price: '10.00', image: '' },
            { id: 2, name: 'Product B', price: '20.00', image: '' },
            { id: 3, name: 'Product C', price: '30.00', image: '' },
            { id: 4, name: 'Product D', price: '40.00', image: '' },
            { id: 5, name: 'Product E', price: '50.00', image: '' },
            { id: 6, name: 'Product F', price: '60.00', image: '' },
            { id: 7, name: 'Product G', price: '70.00', image: '' },
            { id: 8, name: 'Product H', price: '80.00', image: '' },
            { id: 9, name: 'Product I', price: '90.00', image: '' },
            { id: 10, name: 'Product J', price: '100.00', image: '' },
            { id: 11, name: 'Product K', price: '110.00', image: '' },
            { id: 12, name: 'Product L', price: '120.00', image: '' },
            { id: 13, name: 'Product M', price: '130.00', image: '' },
            { id: 14, name: 'Product N', price: '140.00', image: '' },
            { id: 15, name: 'Product O', price: '150.00', image: '' },
        ];
        setAllProducts(fetchedProducts);
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

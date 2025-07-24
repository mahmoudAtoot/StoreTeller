import React from 'react';
import Product2D from '../../shared/product2d';
import styles from './storeshelf.module.css';

const StoreShelf = ({ isOwner }) => {
    // Placeholder for items on a shelf
    const items = [
        { id: 1, name: 'Product 1', price: '10.00', image: '' },
        { id: 2, name: 'Product 2', price: '20.00', image: '' },
        { id: 3, name: 'Product 3', price: '30.00', image: '' },
        { id: 4, name: 'Product 4', price: '40.00', image: '' },
        { id: 5, name: 'Product 5', price: '50.00', image: '' },
    ];

    return (
        <div className={`${styles.row} ${styles.mb4}`}>
            {items.map(item => (
                <div key={item.id} className={styles.col}>
                    <Product2D product={item} isOwner={isOwner} />
                </div>
            ))}
        </div>
    );
};

export default StoreShelf;

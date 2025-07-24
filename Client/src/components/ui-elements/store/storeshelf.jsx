import React from 'react';
import Product2D from '../../shared/product2d';
import { ShelfVisual } from './'; // Import ShelfVisual
import styles from './storeshelf.module.css';

const StoreShelf = ({ isOwner, onProductClick }) => {
    console.log('StoreShelf: onProductClick prop:', onProductClick);
    // Placeholder for items on a shelf
    const items = [
        { id: 1, name: 'Product 1', price: '10.00', image: '' },
        { id: 2, name: 'Product 2', price: '20.00', image: '' },
        { id: 3, name: 'Product 3', price: '30.00', image: '' },
        { id: 4, name: 'Product 4', price: '40.00', image: '' },
        { id: 5, name: 'Product 5', price: '50.00', image: '' },
    ];

    return (
        <div className={styles.shelfContainer}>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={styles.productWrapper}
                    style={{ left: `${(index / items.length) * 100 + (100 / items.length / 2)}%`, transform: `translateX(-50%)` }} /* Position items evenly */
                >
                    <Product2D product={item} isOwner={isOwner} onProductClick={onProductClick} />
                </div>
            ))}
            <ShelfVisual />
        </div>
    );
};

export default StoreShelf;

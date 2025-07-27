import React from 'react';
import Product2D from '../../shared/product2d';
import { ShelfVisual } from './';
import styles from './storeshelf.module.css';

const StoreShelf = ({ isOwner, onProductClick, products, onProductHover, onEditClick, productsPerShelf }) => {
    
    // Assuming products are passed as a prop now

    const shelfBottom = 0; // Fixed bottom position for a single shelf

    return (
        <div className={styles.shelfContainer}>
            <ShelfVisual style={{ bottom: `${shelfBottom}px` }} />
            {Array.from({ length: productsPerShelf }).map((_, itemIndex) => {
                const item = products[itemIndex];
                if (!item) return null; // Don't render if product is null or undefined
                return (
                    <div
                        key={item._id} // Use item._id for unique key
                        className={styles.productWrapper}
                        style={{
                            left: `${(itemIndex / productsPerShelf) * 100 + (100 / productsPerShelf / 2)}%`,
                            transform: `translateX(-50%)`,
                            bottom: `${shelfBottom + 10}px`, // Position above the shelf visual
                        }}
                    >
                        <Product2D product={item} isOwner={isOwner} onProductClick={onProductClick} onProductHover={onProductHover} onEditClick={onEditClick} />
                    </div>
                );
            })}
        </div>
    );
};

export default StoreShelf;

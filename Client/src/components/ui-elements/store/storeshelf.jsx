import React from 'react';
import Product2D from '../../shared/product2d';
import { ShelfVisual } from './';
import styles from './storeshelf.module.css';

const StoreShelf = ({ isOwner, onProductClick, products, onProductHover }) => {
    console.log('StoreShelf: onProductClick prop:', onProductClick);
    // Assuming products are passed as a prop now

    const shelfBottom = 0; // Fixed bottom position for a single shelf

    return (
        <div className={styles.shelfContainer}>
            <ShelfVisual style={{ bottom: `${shelfBottom}px` }} />
            {products.map((item, itemIndex) => (
                <div
                    key={item.id} // Assuming item.id is unique across all products
                    className={styles.productWrapper}
                    style={{
                        left: `${(itemIndex / products.length) * 100 + (100 / products.length / 2)}%`,
                        transform: `translateX(-50%)`,
                        bottom: `${shelfBottom + 10}px`, // Position above the shelf visual
                    }}
                >
                    <Product2D product={item} isOwner={isOwner} onProductClick={onProductClick} onProductHover={onProductHover} />
                </div>
            ))}
        </div>
    );
};

export default StoreShelf;

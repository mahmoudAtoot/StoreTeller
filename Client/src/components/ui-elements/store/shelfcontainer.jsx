import React from 'react';
import StoreShelf from './storeshelf';
import styles from './shelfcontainer.module.css';

const ShelfContainer = ({ isOwner, onProductClick }) => {
    console.log('ShelfContainer: onProductClick prop:', onProductClick);
    // Placeholder for shelves
    const shelves = [1, 2, 3];

    return (
        <div className={styles.containerFluid}>
            {shelves.map(shelfId => (
                <StoreShelf key={shelfId} isOwner={isOwner} onProductClick={onProductClick} />
            ))}
        </div>
    );
};

export default ShelfContainer;

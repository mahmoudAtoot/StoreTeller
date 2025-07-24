import React from 'react';
import styles from './product2d.module.css';

const Product2D = ({ product, isOwner, onProductClick }) => {

    const handleClick = () => {
        console.log('Product2D: handleClick called');
        if (onProductClick) {
            console.log('Product2D: Calling onProductClick with product:', product);
            onProductClick(product);
        } else {
            console.log('Product2D: onProductClick is UNDEFINED');
        }
    };

    return (
        <>
            <div className={styles.productContainer} onClick={handleClick}>
                <img src={product.image || 'https://placehold.co/600x400'} className={styles.productImage} alt={product.name} />
                {isOwner && <button className={styles.editButton}>Edit</button>}
            </div>
        </>
    );
};

export default Product2D;

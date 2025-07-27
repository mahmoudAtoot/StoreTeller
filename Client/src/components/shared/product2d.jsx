import React from 'react';
import styles from './product2d.module.css';

const Product2D = ({ product, isOwner, onProductClick, onProductHover, onEditClick }) => {

    const handleClick = () => {
        if (onProductClick) {
            onProductClick(product);
        }
    };

    const handleMouseEnter = () => {
        if (onProductHover) {
            onProductHover(product);
        }
    };

    const handleMouseLeave = () => {
        if (onProductHover) {
            onProductHover(null); // Clear hovered product when mouse leaves
        }
    };

    const imageUrl = product.image ? `http://localhost:8000${product.image}` : '';

    return (
        <>
            <div
                className={styles.productContainer}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={imageUrl} className={styles.productImage} alt={product.name} />
                {isOwner && <button className={styles.editButton} onClick={(e) => { e.stopPropagation(); onEditClick(product); }}>Edit</button>}
            </div>
        </>
    );
};

export default Product2D;

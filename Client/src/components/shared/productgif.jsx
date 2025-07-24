import React from 'react';
import styles from './productgif.module.css';

const ProductGif = ({ product }) => {
    return (
        <div>
            <img src={product.gif || 'https://placehold.co/600x400/000000/FFFFFF?text=3D+View'} alt={`${product.name} 3D View`} className={styles.productImage} />
        </div>
    );
};

export default ProductGif;

import React from 'react';
import styles from './productgif.module.css';

const ProductGif = ({ product }) => {
    return (
        <div>
            <img src={product.gif || ''} alt={`${product.name} 3D View`} className={styles.productImage} />
        </div>
    );
};

export default ProductGif;

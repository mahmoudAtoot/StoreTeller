import React from 'react';
import ProductGif from '../../shared/productgif';
import Counter from './counter';
import styles from './itemdisplay.module.css';

const ItemDisplay = ({ product, onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.row}>
                    <div className={styles.colMd6}>
                        <ProductGif product={product} />
                    </div>
                    <div className={styles.colMd6}>
                        <h2>{product.name}</h2>
                        <p>{product.description || 'No description available.'}</p>
                        <h3>${product.price}</h3>
                        <Counter />
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
                <button className={`btn btn-danger ${styles.closeBtn}`} onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ItemDisplay;

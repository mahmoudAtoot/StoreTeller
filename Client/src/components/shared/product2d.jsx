import React, { useState } from 'react';
import ItemDisplay from '../ui-elements/store/itemdisplay';
import styles from './product2d.module.css';

const Product2D = ({ product, isOwner }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleClick = () => {
        setShowOverlay(true);
    };

    const handleClose = () => {
        setShowOverlay(false);
    };

    return (
        <>
            <div className={`${styles.card} ${styles.h100}`} onClick={handleClick}>
                <img src={product.image || 'https://placehold.co/600x400'} className={styles.cardImgTop} alt={product.name} />
                <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>{product.name}</h5>
                    <p className={styles.cardText}>${product.price}</p>
                    {isOwner && <button className="btn btn-primary">Edit</button>}
                </div>
            </div>
            {showOverlay && <ItemDisplay product={product} onClose={handleClose} />}
        </>
    );
};

export default Product2D;

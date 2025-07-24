import React from 'react';
import ItemInfoForm from './iteminfoform';
import UploadImages from './uploadimages';
import styles from './productadd.module.css';

const ProductAdd = () => {
    return (
        <div className={styles.container}>
            <h2>Add Product</h2>
            <ItemInfoForm />
            <UploadImages />
            <button>Add Product</button>
        </div>
    );
};

export default ProductAdd;
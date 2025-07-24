import React from 'react';
import styles from './uploadimages.module.css';

const UploadImages = () => {
    return (
        <div className={styles.container}>
            <label>Upload Images:</label>
            <input type="file" multiple />
        </div>
    );
};

export default UploadImages;
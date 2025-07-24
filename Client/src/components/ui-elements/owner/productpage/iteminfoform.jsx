import React from 'react';
import styles from './iteminfoform.module.css';

const ItemInfoForm = () => {
    return (
        <form className={styles.form}>
            <label>Name:</label>
            <input type="text" />
            <label>Price:</label>
            <input type="text" />
            <label>Description:</label>
            <textarea></textarea>
        </form>
    );
};

export default ItemInfoForm;
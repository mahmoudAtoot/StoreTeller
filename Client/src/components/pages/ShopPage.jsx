import React from 'react';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import styles from './ShopPage.module.css';

function ShopPage() {
    return (
        <div className={styles.container}>
            <CategorySelector />
            <ShelfContainer />
        </div>
    );
}

export default ShopPage;

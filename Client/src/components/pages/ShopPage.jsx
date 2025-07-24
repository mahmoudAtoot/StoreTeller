import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import { Cashier } from '../ui-elements/store';
import styles from './ShopPage.module.css';

function ShopPage() {
    const { onProductClick } = useOutletContext();
    console.log('ShopPage: onProductClick from Outlet context:', onProductClick);

    return (
        <div className={styles.shopPageContainer}>
            <div className={styles.mainContent}>
                <CategorySelector />
                <ShelfContainer onProductClick={onProductClick} />
            </div>
            <div className={styles.cashierSection}>
                <Cashier />
            </div>
        </div>
    );
}

export default ShopPage;

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import { Cashier } from '../ui-elements/store';
import styles from './ShopPage.module.css';

function ShopPage() {
    const { onProductClick } = useOutletContext();
    const [hoveredProduct, setHoveredProduct] = useState(null);

    console.log('ShopPage: onProductClick from Outlet context:', onProductClick);

    return (
        <div className={styles.shopPageContainer}>
            <div className={styles.mainContent}>
                <CategorySelector />
                <ShelfContainer onProductClick={onProductClick} onProductHover={setHoveredProduct} />
            </div>
            <Cashier hoveredProduct={hoveredProduct} className={styles.cashierSection} />
        </div>
    );
}

export default ShopPage;

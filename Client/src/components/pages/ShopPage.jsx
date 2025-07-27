import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import { Cashier } from '../ui-elements/store';
import styles from './ShopPage.module.css';
import { useAuth } from '../../context/AuthContext';

function ShopPage() {
    const { onProductClick } = useOutletContext();
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const { isOwner } = useAuth();

    console.log('ShopPage: onProductClick from Outlet context:', onProductClick);

    return (
        <div className={styles.shopPageContainer}>
            <div className={styles.mainContent}>
                <CategorySelector />
                <ShelfContainer onProductClick={onProductClick} onProductHover={setHoveredProduct} isOwner={isOwner} />
            </div>
            <Cashier hoveredProduct={hoveredProduct} className={styles.cashierSection} />
        </div>
    );
}

export default ShopPage;

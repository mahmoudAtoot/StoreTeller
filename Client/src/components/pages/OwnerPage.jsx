import React from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import styles from './OwnerPage.module.css';

function OwnerPage() {
    return (
        <div className={styles.container}>
            <div className={`${styles.dFlex} ${styles.justifyContentBetween} ${styles.alignItemsCenter} ${styles.mb3}`}>
                <CategorySelector />
                <div>
                    <button className="btn btn-primary me-2">Add Category</button>
                    <Link to="/add" className="btn btn-success">Add Product</Link>
                </div>
            </div>
            <ShelfContainer isOwner={true} />
        </div>
    );
}

export default OwnerPage;

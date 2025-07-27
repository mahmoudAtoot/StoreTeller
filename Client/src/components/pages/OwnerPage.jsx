import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';
import styles from './OwnerPage.module.css';
import { useAuth } from '../../context/AuthContext';

function OwnerPage() {
    const { isOwner, shopName } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOwner || !shopName) {
            navigate('/'); // Redirect if not an owner or no shop associated
        }
    }, [isOwner, shopName, navigate]);

    if (!isOwner || !shopName) {
        return null; // Or a loading spinner
    }

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

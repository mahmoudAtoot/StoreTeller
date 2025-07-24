import React from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';

function OwnerPage() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <CategorySelector />
                <div>
                    <button className="btn btn-primary me-2">Add Category</button>
                    <Link to="/add-product" className="btn btn-success">Add Product</Link>
                </div>
            </div>
            <ShelfContainer isOwner={true} />
        </div>
    );
}

export default OwnerPage;

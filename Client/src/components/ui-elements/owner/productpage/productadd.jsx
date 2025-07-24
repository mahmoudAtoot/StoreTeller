import React from 'react';
import ItemInfoForm from './iteminfoform';
import UploadImages from './uploadimages';

const ProductAdd = () => {
    return (
        <div>
            <h2>Add Product</h2>
            <ItemInfoForm />
            <UploadImages />
            <button>Add Product</button>
        </div>
    );
};

export default ProductAdd;
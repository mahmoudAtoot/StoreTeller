import React from 'react';

const ProductGif = ({ product }) => {
    return (
        <div>
            <img src={product.gif} alt={product.name} />
            
        </div>
    );
};

export default ProductGif;
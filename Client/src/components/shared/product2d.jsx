import React from 'react';

const Product2D = ({ product }) => {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            
        </div>
    );
};

export default Product2D;
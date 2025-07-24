import React, { useState } from 'react';
import ItemDisplay from '../ui-elements/store/itemdisplay';

const Product2D = ({ product, isOwner }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleClick = () => {
        setShowOverlay(true);
    };

    const handleClose = () => {
        setShowOverlay(false);
    };

    return (
        <>
            <div className="card h-100" onClick={handleClick}>
                <img src={product.image || 'https://placehold.co/600x400'} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    {isOwner && <button className="btn btn-primary">Edit</button>}
                </div>
            </div>
            {showOverlay && <ItemDisplay product={product} onClose={handleClose} />}
        </>
    );
};

export default Product2D;

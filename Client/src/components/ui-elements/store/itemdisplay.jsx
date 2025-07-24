import React from 'react';
import ProductGif from '../../shared/productgif';
import Counter from './counter';

const ItemDisplay = ({ product, onClose }) => {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                <div className="row">
                    <div className="col-md-6">
                        <ProductGif product={product} />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p>{product.description || 'No description available.'}</p>
                        <h3>${product.price}</h3>
                        <Counter />
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
                <button className="btn btn-danger close-btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ItemDisplay;

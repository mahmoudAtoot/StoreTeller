import React from 'react';

const ItemDisplay = ({ item }) => {
    return (
        <div>
            <img src={item.image} alt={item.name} />
            
        </div>
    );
};

export default ItemDisplay;
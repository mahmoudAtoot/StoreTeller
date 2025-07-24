import React from 'react';
import ItemDisplay from './itemdisplay';

const StoreShelf = () => {
    const items = [];
    return (
        <div>
            {items.map(item => (
                <ItemDisplay item={item} />
            ))}
        </div>
    );
};

export default StoreShelf;
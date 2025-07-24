import React from 'react';
import StoreShelf from './storeshelf';

const ShelfContainer = ({ isOwner }) => {
    // Placeholder for shelves
    const shelves = [1, 2, 3];

    return (
        <div className="container-fluid">
            {shelves.map(shelfId => (
                <StoreShelf key={shelfId} isOwner={isOwner} />
            ))}
        </div>
    );
};

export default ShelfContainer;

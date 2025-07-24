import React from 'react';
import CategorySelector from '../ui-elements/store/categoryselector';
import ShelfContainer from '../ui-elements/store/shelfcontainer';

function ShopPage() {
    return (
        <div>
            <CategorySelector />
            <ShelfContainer />
        </div>
    );
}

export default ShopPage;

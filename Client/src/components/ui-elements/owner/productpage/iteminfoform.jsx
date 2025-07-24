import React from 'react';

const ItemInfoForm = () => {
    return (
        <form>
            <label>Name:</label>
            <input type="text" />
            <label>Price:</label>
            <input type="text" />
            <label>Description:</label>
            <textarea></textarea>
        </form>
    );
};

export default ItemInfoForm;
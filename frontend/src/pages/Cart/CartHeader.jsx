import React from 'react';
import './CartHeader.css';

const CartHeader = () => {
    return (
        <div className="header">
            <div className="search-bar1">
                <button className="cart-icon">&#x1F6D2;</button>
                <input type="text" placeholder="Find your previous orders" />
                <button className="search-button1">Search</button>
            </div>
        </div>
    );
};

export default CartHeader;

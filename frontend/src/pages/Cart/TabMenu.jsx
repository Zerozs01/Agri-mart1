import React, { useState } from 'react';
import './TabMenu.css'; // สร้างไฟล์ CSS สำหรับสไตล์

const TabMenu = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('cart');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="tab-menu">
            <button
                className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
                onClick={() => handleTabClick('cart')}
            >
                Cart
            </button>
            <button
                className={`tab-button1 ${activeTab === 'order-status' ? 'active1' : ''}`}
                onClick={() => handleTabClick('order-status')}
            >
                Order Status
            </button>
        </div>
    );
};

export default TabMenu;

import React, { useState } from "react";
import "./CartSection.css";

const CartSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product name 1",
      description: "information",
      price: 35.0,
      quantity: 1,
      image: "/path/to/product-image.jpg",
    },
    {
      id: 2,
      name: "Product name 2",
      description: "information",
      price: 30.0,
      quantity: 1,
      image: "/path/to/product-image.jpg",
    },
    {
      id: 3,
      name: "Product name 3",
      description: "information",
      price: 35.0,
      quantity: 1,
      image: "/path/to/product-image.jpg",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  // ฟังก์ชันในการเลือก/ไม่เลือกสินค้า
  const toggleSelection = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ฟังก์ชันลบสินค้า
  const removeSelectedItems = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  // คำนวณยอดรวมสินค้า
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ค่าจัดส่ง
  const shippingCost = 50;

  return (
    <div className="cart-wrapper cart-ui">
      <div className="cart-section">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
              className="item-checkbox"
            />
            <div className="product-image"></div>
            <div className="item-details">
              <h2 className="item-name">{item.name}</h2>
              <p className="item-description">{item.description}</p>
              <div className="price-quantity-container">
                <span className="item-price">{item.price} บาท</span>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มลบสินค้าที่เลือก */}
      {selectedItems.length > 0 && (
        <button className="remove-selected-btn" onClick={removeSelectedItems}>
          ลบสินค้าที่เลือก
        </button>
      )}

      <div className="cart-summary">
        <div className="summary-row">
          <span>ยอดรวมสินค้า</span>
          <span className="total-amount">{calculateTotal()} บาท</span>
        </div>
        <div className="summary-row shipping">
          <span>ค่าจัดส่ง</span>
          <span>{shippingCost} บาท</span>
        </div>
        <div className="summary-row total text-gradient ">
          <span>ยอดรวมทั้งหมด</span>
          <span className="total-amount ">
            {calculateTotal() + shippingCost} บาท
          </span>
        </div>
        <button className="payment-btn">GO TO PAYMENT</button>
      </div>
    </div>
  );
};

export default CartSection;


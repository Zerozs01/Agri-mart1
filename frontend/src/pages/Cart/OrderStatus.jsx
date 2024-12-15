/** @format */

import React from "react";
import "./OrderStatus.css";

const OrderStatus = () => {
  const orders = [
    {
      id: 1,
      name: "Product name 1",
      information: "information",
      quantity: 1,
      status: "Preparing",
    },
    {
      id: 2,
      name: "Product name 2",
      information: "information",
      quantity: 1,
      status: "Start Shipping",
      tracking: "Tracking number xxxxxxxxxxxxxx",
    },
  ];

  // ฟังก์ชันสำหรับเปิดแท็บใหม่
  const openFlashExpress = () => {
    window.open("https://www.flashexpress.com/fle/tracking", "_blank");
  };

  const openEMS = () => {
    window.open("https://track.thailandpost.co.th/?trackNumber", "_blank");
  };

  return (
    <div className="order-status-ui">
      <table className="order-table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QUANTITY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <div className="item-info">
                  <div className="image-placeholder" />
                  <div>
                    <p className="product-name">{order.name}</p>
                    <p className="product-info">{order.information}</p>
                  </div>
                </div>
              </td>
              <td className="center">{order.quantity}</td>
              <td>
                <p>{order.status}</p>
                {order.tracking && (
                  <p className="tracking-number">{order.tracking}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button className="tracking-button" onClick={openFlashExpress}>
          Tracking number
        </button>
        <button className="flash-button" onClick={openFlashExpress}>
          FLASH EXPRESS
        </button>
        <button className="ems-button" onClick={openEMS}>
          EMS THAILAND POST
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;

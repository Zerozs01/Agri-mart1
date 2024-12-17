import React, { useContext } from "react";
import "./Cart0.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate} from 'react-router-dom';

const Cart0 = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  if (!food_list || !cartItems) {
    return <div>Loading...</div>;
  }

  const total = getTotalCartAmount();
  const deliveryCharge = total === 0 ? 0 : 25;

  return (
    <div className="cart ">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr/>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom text-light">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details ">
              <p className=''>Subtotal</p>
              <p>{total} BATH</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{deliveryCharge} BATH</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{total + deliveryCharge} BATH</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have promocode type here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart0;

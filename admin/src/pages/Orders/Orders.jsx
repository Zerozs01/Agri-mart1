import  { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Orders.css';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            toast.error("Error");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", { orderId, status: event.target.value });
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    const deleteOrder = async (orderId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบออเดอร์นี้?')) {
            try {
                const response = await axios.delete(`${url}/api/order/delete/${orderId}`);
                if (response.data.success) {
                    toast.success('ล���ออเดอร์สำเร็จ');
                    await fetchAllOrders();
                } else {
                    toast.error('เกิดข้อผิดพลาดในการลบออเดอร์');
                }
            } catch (error) {
                toast.error('เกิดข้อผิดพลาดในการลบออเดอร์');
            }
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-items border'>
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ", "}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select className='order-items' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button 
                            onClick={() => deleteOrder(order._id)}
                            className="delete-btn"
                        >
                            delete order
                        </button>
                        <div className="detail-item">
                            <span>วันที่สั่งซื้อ:</span>
                            <span>
                                {new Date(order.date).toLocaleString('th-TH', {
                                    timeZone: 'Asia/Bangkok'
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders;
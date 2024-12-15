import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { assets } from '../../assets/frontend_assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import Footer from '../../components/Footer/Footer';
import OrderTrackingModal from '../../components/OrderTrackingModal/OrderTrackingModal';

const MyOrders = () => {
	const { url, token } = useContext(StoreContext);
	const [data, setData] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const fetchOrders = async () => {
		try {
			const response = await axios.post(
				`${url}/api/order/user-orders`,
				{},
				{ headers: { token } }
			);

			if (response.data.success) {
				setData(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching orders");
		}
	}

	const trackOrder = (order) => {
		setSelectedOrder(order);
	}

	useEffect(() => {
		if (token) {
			fetchOrders();
		}
	}, [token])

	return (
		<div>
			<div className='my-orders'>
				<h2 className='text-light'>My Orders</h2>
				<div className="container">
					{data.map((order, index) => {
						return (
							<div key={index} className="my-orders-order">
								<img src={assets.parcel_icon} alt="" />
								<p>{order.items.map((item, index) => {
									if (index === order.items.length - 1) {
										return item.name + " x " + item.quantity
									} else {
										return item.name + " x " + item.quantity + ", "
									}
								})}</p>
								<p>{order.amount}.00 BATH</p>
								<p>Items: {order.items.length}</p>
								<p><span>&#x25cf;</span> <b className='status'>{order.status}</b></p>
								<button 
									onClick={() => trackOrder(order)}
									className="track-btn"
								>
									ติดตามออเดอร์
								</button>
							</div>
						)
					})}
				</div>
			</div>
			
			{selectedOrder && (
				<OrderTrackingModal 
					order={selectedOrder} 
					onClose={() => setSelectedOrder(null)} 
				/>
			)}
			
			<Footer />
		</div>
	)
}

export default MyOrders

import './OrderTrackingModal.css';

const OrderTrackingModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="tracking-modal-overlay">
            <div className="tracking-modal">
                <div className="tracking-modal-header">
                    <h2>ติดตามออเดอร์</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="tracking-modal-content">
                    <div className="order-status">
                        <div className="status-timeline">
                            <div className={`status-point ${order.status === 'Food Processing' ? 'active' : ''}`}>
                                <div className="point"></div>
                                <p>กำลังจัดเตรียมอาหาร</p>
                            </div>
                            <div className={`status-point ${order.status === 'Out for delivery' ? 'active' : ''}`}>
                                <div className="point"></div>
                                <p>กำลังจัดส่ง</p>
                            </div>
                            <div className={`status-point ${order.status === 'Delivered' ? 'active' : ''}`}>
                                <div className="point"></div>
                                <p>จัดส่งสำเร็จ</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-details">
                        <h3>รายละเอียดออเดอร์</h3>
                        <div className="detail-item">
                            <span>เลขออเดอร์:</span>
                            <span>{order._id}</span>
                        </div>
                        <div className="detail-item">
                            <span>วันที่สั่งซื้อ:</span>
                            <span>{new Date(order.date).toLocaleString('th-TH', {
                                timeZone: 'Asia/Bangkok',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                        <div className="detail-item">
                            <span>สถานะการชำระเงิน:</span>
                            <span className={order.payment ? 'paid' : 'unpaid'}>
                                {order.payment ? 'ชำระแล้ว' : 'ยังไม่ชำระ'}
                            </span>
                        </div>
                    </div>

                    <div className="delivery-details">
                        <h3>ข้อมูลการจัดส่ง</h3>
                        <div className="detail-item">
                            <span>ที่อยู่:</span>
                            <span>{order.address.street}, {order.address.city}</span>
                        </div>
                        <div className="detail-item">
                            <span>เบอร์โทร:</span>
                            <span>{order.address.phone}</span>
                        </div>
                    </div>

                    <div className="order-items">
                        <h3>รายการสินค้า</h3>
                        {order.items.map((item, index) => (
                            <div key={index} className="item">
                                <span>{item.name}</span>
                                <span>x {item.quantity}</span>
                            </div>
                        ))}
                        <div className="total">
                            <span>ยอดรวม:</span>
                            <span>{order.amount}.00 BATH</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingModal; 
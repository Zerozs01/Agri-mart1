import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext'; // Add this import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = React.useState(new URLSearchParams(window.location.search));
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
		try {
			const response = await axios.post(url + "/api/order/verify", { success, orderId });
			if (response.data.success) {
				navigate("/myorders");
			} else {
				navigate("/");
			}
		} catch (error) {
			console.error("Error verifying payment:", error);
			navigate("/");
		}
	}

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;
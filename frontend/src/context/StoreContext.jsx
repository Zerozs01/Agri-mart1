import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://agri-mart1-backend.onrender.com"
    const [token, setToken] = useState("");
	const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        try {
            // เพิ่มสินค้าในตระกร้าก่อนเลย โดยไม่สนใจ token
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));
    
            // เก็บ cart items ใน localStorage เพื่อรักษาสถานะ
            localStorage.setItem('cartItems', JSON.stringify({
                ...cartItems,
                [itemId]: (cartItems[itemId] || 0) + 1
            }));
    
            // ถ้ามี token ค่อยส่ง request ไปที่ backend
            if (token) {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
    
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            
            if (token) {
                const response = await axios.post(url + "/api/cart/remove", 
                    { itemId }, 
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

	const fetchFoodList = async () => {
		const response = await axios.get(url+"/api/food/list");
		setFoodList(response.data.data)
	}

	const loadCartData = async (token) => {
		try {
			const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
			if (response.data.success) {
				setCartItems(response.data.cartData || {});
			}
		} catch (error) {
			console.error("Error loading cart:", error);
			setCartItems({});
		}
	}

	// เพิ่มการโหลด cart items จาก localStorage เมื่อเริ่มแอป
useEffect(() => {
    async function loadData() {
        await fetchFoodList();
        
        // โหลด cart items จาก localStorage
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }

        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }
    loadData();
}, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

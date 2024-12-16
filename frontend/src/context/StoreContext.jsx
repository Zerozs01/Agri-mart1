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
            if (!token) {
                console.log("No token found");
                return;
            }

            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));

            const response = await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                { headers: { token } }
            );

            console.log("Add to cart response:", response.data);

            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.log("Error:", response.data.message);
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) - 1
                }));
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

	useEffect(() => {
		async function loadData(){
			await fetchFoodList();
			if(localStorage.getItem('token')){
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			}
		}
		loadData();
	},[]);

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

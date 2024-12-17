import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return {};
        }
        const savedCart = localStorage.getItem('tempCart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const url = "https://agri-mart1-backend.onrender.com"
    const [token, setToken] = useState("");
	const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        } else {
            setCartItems(prev => {
                const newCart = {
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1
                };
                localStorage.setItem('tempCart', JSON.stringify(newCart));
                return newCart;
            });
        }
    };

    const removeFromCart = async (itemId) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        } else {
            setCartItems(prev => {
                const newCart = { ...prev };
                newCart[itemId] = Math.max((prev[itemId] || 0) - 1, 0);
                
                if (newCart[itemId] === 0) {
                    delete newCart[itemId];
                }

                if (Object.keys(newCart).length > 0) {
                    localStorage.setItem('tempCart', JSON.stringify(newCart));
                } else {
                    localStorage.removeItem('tempCart');
                }
                
                return newCart;
            });
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
		async function loadData() {
			await fetchFoodList();
			const token = localStorage.getItem('token');
			if (token) {
				setToken(token);
				localStorage.removeItem('tempCart');
				await loadCartData(token);
			}
		}
		loadData();
	}, []);

    const clearTempCart = () => {
        console.log("Clearing temp cart");
        localStorage.removeItem('tempCart');
        setCartItems({});
        console.log("After clearing:", localStorage.getItem('tempCart'));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        clearTempCart,
        logout
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

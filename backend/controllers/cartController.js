import userModel from '../models/userModel.js';

// fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        let userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        res.json({ success: true, cartData: userData.cartData });

    } catch (error) {
        console.error("Error in getCart:", error);
        res.json({ success: false, message: "Error fetching cart" });
    }
}

// add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        const itemId = req.body.itemId;
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1;
        } else {
            userData.cartData[itemId] += 1;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData: userData.cartData },
            { new: true }
        );

        res.json({ 
            success: true, 
            message: "Item Added to Cart",
            cartData: updatedUser.cartData 
        });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.json({ success: false, message: "Error adding to cart" });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData: userData.cartData },
            { new: true }
        );

        res.json({ 
            success: true, 
            message: "Item removed from cart",
            cartData: updatedUser.cartData 
        });

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.json({ success: false, message: "Error removing from cart" });
    }
}

export { addToCart, removeFromCart, getCart };

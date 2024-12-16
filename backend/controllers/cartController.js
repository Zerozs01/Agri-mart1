import userModel from '../models/userModel.js'; 
import foodModel from '../models/foodModel.js';

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { itemId, quantity } = req.body;

        // ค้นหาผู้ใช้
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // ตรวจสอบ cartData หากยังไม่มี
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // ตรวจสอบว่ามีสินค้านี้จริงหรือไม่
        const foodItem = await foodModel.findById(itemId);
        if (!foodItem) {
            return res.json({ success: false, message: "Item not found" });
        }

        // เพิ่มหรืออัปเดตจำนวนสินค้าในตะกร้า
        if (userData.cartData[itemId]) {
            userData.cartData[itemId] += quantity;
        } else {
            userData.cartData[itemId] = quantity;
        }

        // บันทึกข้อมูล
        await userData.save();

        return res.json({
            success: true,
            message: "Added to cart successfully",
            cartData: userData.cartData
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error adding to cart",
            error: error.message
        });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { itemId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (userData.cartData && userData.cartData[itemId]) {
            delete userData.cartData[itemId];
            await userData.save();

            return res.json({
                success: true,
                message: "Removed from cart successfully",
                cartData: userData.cartData
            });
        } else {
            return res.json({
                success: false,
                message: "Item not in cart"
            });
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error removing from cart",
            error: error.message
        });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            cartData: userData.cartData || {}
        });
    } catch (error) {
        console.error("Error getting cart:", error);
        return res.status(500).json({
            success: false,
            message: "Error getting cart",
            error: error.message
        });
    }
}

const syncCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        
        // ค้นหา user
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // ตรวจสอบ cartData หากยังไม่มี
        if (!userData.cartData) {
            userData.cartData = {};
        }
        
        // รวม cart items
        const mergedCartItems = { ...userData.cartData };
        
        // ตรวจสอบและเพิ่ม items จาก local storage
        for (const [itemId, quantity] of Object.entries(req.body.cartItems || {})) {
            // เพิ่มการตรวจสอบ itemId ว่ามีอยู่จริงหรือไม่
            const itemExists = await foodModel.findById(itemId);
            if (itemExists) {
                if (mergedCartItems[itemId]) {
                    // หากมี item นี้อยู่แล้ว ให้เพิ่มจำนวน
                    mergedCartItems[itemId] += quantity;
                } else {
                    // หากยังไม่มี item นี้ ให้เพิ่มใหม่
                    mergedCartItems[itemId] = quantity;
                }
            }
        }
        
        // อัปเดต cart ของ user
        userData.cartData = mergedCartItems;
        await userData.save();
        
        return res.json({
            success: true,
            message: "Cart synced successfully",
            cartData: mergedCartItems
        });
    } catch (error) {
        console.error("Error in syncCart:", error);
        res.status(500).json({
            success: false,
            message: "Error syncing cart",
            error: error.message
        });
    }
}

export { 
    addToCart, 
    removeFromCart, 
    getCart, 
    syncCart 
};
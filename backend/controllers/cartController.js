// เพิ่ม import ถ้ายังไม่มี
import foodModel from '../models/foodModel.js'; // หากต้องใช้ตรวจสอบ itemId

// เพิ่มฟังก์ชัน syncCart
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

// เพิ่ม export
export { addToCart, removeFromCart, getCart, syncCart };
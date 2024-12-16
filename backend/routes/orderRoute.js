import express from 'express'; 
import authMiddleware from "../middleware/auth.js"; 
import {      
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateOrderStatus,
    deleteOrder  
} from '../controllers/orderController.js';  

const orderRouter = express.Router();  

// Frontend routes 
orderRouter.post("/place", authMiddleware, placeOrder); 
orderRouter.post("/verify", verifyOrder); 
orderRouter.post("/user-orders", authMiddleware, userOrders);

// Admin routes 
orderRouter.get("/list", listOrders); 
orderRouter.post("/status", updateOrderStatus); 
orderRouter.delete("/delete/:orderId", deleteOrder);  

export default orderRouter;
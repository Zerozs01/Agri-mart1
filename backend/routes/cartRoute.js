import express from 'express'; 
import { 
    addToCart, 
    removeFromCart, 
    getCart,
    syncCart  // เพิ่ม syncCart
} from '../controllers/cartController.js'; 
import authMiddleware from "../middleware/auth.js";  

const cartRouter = express.Router();  

cartRouter.post('/add', authMiddleware, addToCart); 
cartRouter.post("/remove", authMiddleware, removeFromCart); 
cartRouter.post("/get", authMiddleware, getCart); 
cartRouter.post('/sync', authMiddleware, syncCart);  // แก้ route เป็น /sync

export default cartRouter;
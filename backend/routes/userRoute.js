import express from "express"; 
import { 
    loginUser, 
    registerUser, 
    createUser, 
    deleteUser, 
    listUsers 
} from "../controllers/userController.js"; 
import authMiddleware from '../middleware/auth.js';
import { syncCart } from '../controllers/cartController.js'; // เพิ่ม import นี้

const userRouter = express.Router();  

userRouter.post("/register", registerUser); 
userRouter.post("/login", loginUser); 
userRouter.get('/list', listUsers); 
userRouter.post('/create', createUser); 
userRouter.delete('/delete/:userId', deleteUser); 
userRouter.post('/cart/sync', authMiddleware, syncCart);  

export default userRouter;
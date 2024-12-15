import express from "express";
import { loginUser, registerUser, createUser, deleteUser, listUsers } from "../controllers/userController.js";
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/list', listUsers);
userRouter.post('/create', createUser);
userRouter.delete('/delete/:userId', deleteUser);

export default userRouter;
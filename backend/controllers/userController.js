import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ดึงรายชื่อผู้ใช้ทั้งหมด
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 });
        res.json({ success: true, data: users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// สร้างผู้ใช้ใหม่
const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // เช็คว่ามี email ซ้ำไหม
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'อีเมลนี้ถูกใช้งานแล้ว' });
        }

        // เข้ารหัสพาสเวิร์ด
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างผู้ใช้ใหม่
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.json({ success: true, message: 'สร้างผู้ใช้สำเร็จ' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ลบผู้ใช้
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await userModel.findByIdAndDelete(userId);
        res.json({ success: true, message: 'ลบผู้ใช้สำเร็จ' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// รวม export ทั้งหมดไว้ที่เดียว
export {
    loginUser,
    registerUser,
    listUsers,
    createUser,
    deleteUser
};
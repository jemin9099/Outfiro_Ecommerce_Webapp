const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",    
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET , {
            expiresIn: '30d'
        });        
        let loginUser = user
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
        })
        res.status(200).json({    
            success: true,
            message: "Login successful",
            data: loginUser,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const currentUser = async (req, res) => {
    try {
        const user = await User.find(req.user.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
module.exports = {
    Register,
    Login,
    currentUser
};
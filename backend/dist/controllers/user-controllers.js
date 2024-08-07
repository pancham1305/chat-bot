import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import bcrypt from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ Message: "OK", users });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: false,
            signed: true,
            sameSite: "none",
            secure: true,
            // domain: ".vercel.app",
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            // domain: ".vercel.app",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            signed: true,
            sameSite: "none",
            secure: true,
        });
        return res
            .status(201)
            .json({ Message: "User created", id: user.email, name: user.name });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).send("User does not exist");
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword)
            return res.status(401).send("Invalid Email or Password");
        // Correct Password
        res.clearCookie(COOKIE_NAME, {
            httpOnly: false,
            signed: true,
            sameSite: "none",
            secure: true,
            // domain: ".vercel.app",
            path: "/",
        });
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            // domain: ".vercel.app",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            signed: true,
            sameSite: "none",
            secure: true,
        });
        return res.status(200).json({
            message: "OK",
            name: existingUser.name,
            email: existingUser.email,
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ "Permissions didn't match: ": "Unauthorized" });
        }
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ "Permissions didn't match: ": "Unauthorized" });
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: false,
            signed: true,
            sameSite: "none",
            secure: true,
            // domain: ".vercel.app",
            path: "/",
        });
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
//# sourceMappingURL=user-controllers.js.map
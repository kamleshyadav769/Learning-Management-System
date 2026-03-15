import { Router } from "express";
import { register, login, logout, getProfile,forgotPassword,resetPassword,changePassword,updateUser,verifyEmail } from "../Controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router =Router();
 router.post("/register",upload.single("avatar"),register);
    router.post("/login",login);
    router.get("/logout",logout);
    router.get("/me",isLoggedIn,getProfile);
    router.post('/forgot-password',forgotPassword);
    router.post('/reset-password/:resetToken',resetPassword);
    router.post('/change-password',isLoggedIn,changePassword);
    router.put('/update',isLoggedIn,upload.single('avatar'),updateUser);
    router.post('/verify-email', verifyEmail);

    export default router;

    
    
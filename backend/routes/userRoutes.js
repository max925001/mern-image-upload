import { Router } from "express";
import {  getAllUser, getProfile, login, logout, profileViewCount, register, updateUser,  } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
//import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router()

router.post('/register' , upload.single('avatar'), register)
router.post('/login' ,login)
router.post('/logout' ,logout)
 router.get('/me' , isLoggedIn, getProfile)
router.put("/update/:id" ,isLoggedIn,upload.single("avatar") ,updateUser)
router.put('/profile/:userId/view', isLoggedIn, profileViewCount);
router.get('/users', getAllUser);

export default router


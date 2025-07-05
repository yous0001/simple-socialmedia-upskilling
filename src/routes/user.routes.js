import { Router } from "express";
import * as userController from '../controllers/user.controllers.js'
import checkIfEmailExists from "../middlewares/checkEmail.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import * as userValidator from '../validators/user.validator.js'
import { auth } from "../middlewares/auth.middleware.js";
const userRouter=Router()

userRouter.post('/register',validationMiddleware(userValidator.registerSchema) ,checkIfEmailExists,userController.register)
userRouter.post('/login',validationMiddleware(userValidator.loginSchema) ,userController.login)
userRouter.get('/verify-email/:token',userController.verifyEmail)
userRouter.post('/logout',userController.logout)
userRouter.post('/refresh-token',userController.refreshToken)
userRouter.get('/profile',auth,userController.profile)

export {
    userRouter
}
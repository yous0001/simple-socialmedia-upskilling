import { Router } from "express";
import * as userController from '../controllers/user.controllers.js'
import checkIfEmailExists from "../middlewares/checkEmail.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import * as userValidator from '../validators/user.validator.js'
const userRouter=Router()

userRouter.post('/register',validationMiddleware(userValidator.registerSchema) ,checkIfEmailExists,userController.register)
userRouter.post('/login',validationMiddleware(userValidator.loginSchema) ,userController.login)

export {
    userRouter
}
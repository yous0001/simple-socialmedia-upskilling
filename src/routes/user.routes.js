import { Router } from "express";
import * as userController from '../controllers/user.controllers.js'
import checkIfEmailExists from "../middlewares/checkEmail.middleware.js";

const userRouter=Router()

userRouter.post('/register', checkIfEmailExists,userController.register)
userRouter.post('/login', userController.login)

export {
    userRouter
}
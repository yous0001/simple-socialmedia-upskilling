import { Router } from "express";
import * as friendController from "../controllers/friend.controller.js"
import { auth } from "../middlewares/auth.middleware.js";

export const friendRouter= Router()

friendRouter.post('/',auth,friendController.sendFriendRequest)
friendRouter.patch('/accept',auth,friendController.acceptFriendRequest)
friendRouter.patch('/reject',auth,friendController.rejectFriendRequest)
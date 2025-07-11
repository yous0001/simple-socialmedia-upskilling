import { Router } from "express";
import * as postController from '../controllers/post.controllers.js'
import { auth } from "../middlewares/auth.middleware.js";

export const postRouter = Router()

postRouter.post('/',auth, postController.createPost)

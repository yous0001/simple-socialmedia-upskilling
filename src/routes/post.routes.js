import { Router } from "express";
import * as postController from '../controllers/post.controllers.js'
import { auth } from "../middlewares/auth.middleware.js";
import { checkOwnership } from "../middlewares/checkOwnership.middleware.js";

export const postRouter = Router()

postRouter.post('/',auth, postController.createPost)
postRouter.get('/my-posts',auth, postController.getMyPosts)
postRouter.get('/',auth, postController.getMyPosts)
postRouter.get('/',auth, postController.getPost)
postRouter.delete('/:id',auth,checkOwnership('posts'), postController.deletePost)
postRouter.put('/:id',auth,checkOwnership('posts'), postController.updatePost)

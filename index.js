import { config } from "dotenv";
import express from "express";
import chalk from "chalk";
import db_connection from "./src/configs/db_connection.config.js";
import { userRouter } from "./src/routes/user.routes.js";
import { globalResponse } from "./src/middlewares/general-response.middleware.js";
import cookieParser from "cookie-parser";
import { postRouter } from "./src/routes/post.routes.js";
import { friendRouter } from "./src/routes/friend.routes.js";

config({path:"./.env"})

const app=express();
const port=process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())

app.use('/auth',userRouter)
app.use('/post',postRouter)
app.use('/friend',friendRouter)



app.use(globalResponse)
export const dbConnection=await db_connection();

app.get('/', (req, res) => {
        res.send('Hello World!')
    })

app.listen(port, () => {
        console.log(chalk.bgGreen(`app is running on port ${port}`))
    })
import { config } from "dotenv";
import express from "express";
import chalk from "chalk";

config({path:"./.env"})

const app=express();
const port=process.env.PORT || 3000;


app.get('/', (req, res) => {
        res.send('Hello World!')
    })

app.listen(port, () => {
        console.log(chalk.bgGreen(`app is running on port ${port}`))
    })
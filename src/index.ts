import express from 'express'
import { AppDataSource } from './database/dbConnections'
import { router } from './routes/baseRoutes'
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(router)
const PORT = process.env.PORT


AppDataSource.initialize().then(async () => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`)
    })
})
// import "express-async-errors"
import express, { Application, json } from 'express'
import uploadRouter from './routes/upload.routes'
import confirmRouter from './routes/confirm.routes'
import customerRouter from './routes/customer.routes'


const app: Application = express()

app.use(json())
app.use("/upload" , uploadRouter)
app.use("/confirm" , confirmRouter)
app.use("" , customerRouter)

export default app
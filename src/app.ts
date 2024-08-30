import express, { Application, json } from 'express'
import uploadRouter from './routes/upload.routes'
import confirmRouter from './routes/confirm.routes'
import customerRouter from './routes/customer.routes'
import handleErrors from './middlewares/handleError.middlewares'


const app: Application = express()

app.use(json())

app.use("/upload" , uploadRouter)
app.use("/confirm" , confirmRouter)
app.use("" , customerRouter)

app.use(handleErrors.handleErrors)

export default app
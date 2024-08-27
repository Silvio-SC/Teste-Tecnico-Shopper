import { Router } from 'express'
import uploadController from '../controller/upload.controller'

const uploadRouter: Router = Router()

uploadRouter.post("", (req, res) => {
    uploadController.upload(req, res);
})

export default uploadRouter;
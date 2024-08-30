import { Router } from 'express'
import uploadController from '../controller/upload.controller'

const uploadRouter: Router = Router()

uploadRouter.post("", (req, res, next) => {
    uploadController.upload(req, res, next);
})

export default uploadRouter;
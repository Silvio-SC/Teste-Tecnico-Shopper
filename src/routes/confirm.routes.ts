import { Router } from 'express'
import confirmController from '../controller/confirm.controller'

const confirmRouter: Router = Router()

confirmRouter.patch("", (req, res, next) => {
    confirmController.confirm(req, res, next);
})

export default confirmRouter;
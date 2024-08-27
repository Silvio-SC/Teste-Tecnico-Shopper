import { Router } from 'express'
import confirmController from '../controller/confirm.controller'

const confirmRouter: Router = Router()

confirmRouter.patch("", (req, res) => {
    confirmController.confirm(req, res);
})

export default confirmRouter;
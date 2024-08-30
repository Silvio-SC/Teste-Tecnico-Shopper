import { Router } from 'express'
import customerController from '../controller/customer.controller'

const customerRouter: Router = Router()

customerRouter.get("/:customerCode/list", async (req, res, next) => {
    customerController.findCustomerMeasures(req, res, next)
})

export default customerRouter;
import { Router } from 'express'
import customerController from '../controller/customer.controller'

const customerRouter: Router = Router()

customerRouter.get("/:customerCode/list", (req, res) => {

    customerController.findCustomerMeasures(req, res)
})

export default customerRouter;
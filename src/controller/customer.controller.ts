import { Response, Request } from "express";


class CustomerController {
    
    findCustomerMeasures = (req: Request, res: Response) => {
        res.send(" OK")
    }
    
}

export default new CustomerController()
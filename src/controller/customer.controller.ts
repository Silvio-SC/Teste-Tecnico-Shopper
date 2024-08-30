import { Response, Request, NextFunction } from "express";
import customerService from "../service/customer.service";


class CustomerController {
    
    findCustomerMeasures = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const resp = await customerService.findCustomerMeasures(req, res)
            res.status(200).json(resp)

        } catch (error) {
            console.log(error)
            res.status(400).json({
                "error_code": "INVALID_TYPE",
                "error_description": "Tipo de medição não permitida"
            })
        }
    }
    
}

export default new CustomerController()
import { Response, Request, NextFunction } from "express";
import measureShema from "../schema/measure.shema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import confirmService from "../service/confirm.service";


class ConfirmController {

    confirm = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyPayload = measureShema.meansureConfirmSchema.parse(req.body)

            confirmService.confirm(verifyPayload, res)

        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                // Acho que a descrição do erro poderia ser outra, porem no pdf do teste tecnico está assim... 
                res.status(404).json({
                    "error_code": "MEASURE_NOT_FOUND",
                    "error_description": "Leitura do mês já realizada"
                }) 
            } 

            return next(error)
        
        } 

        res.status(200).json({success: true})
    }

}

export default new ConfirmController()
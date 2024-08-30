import { Response, Request, NextFunction } from "express";
import UploadSchema from "../schema/upload.shema";
import UploadService from "../service/upload.service";
import { IUploadReq } from "../interface/upload.interface";
import { ZodError } from "zod";


class UploadController {
    
    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifyPayload = UploadSchema.uploadSchema.parse(req.body)

            const Res = await UploadService.upload(verifyPayload)
    
            if (Res) {
                const verifyPayload = UploadSchema.meansureResponseSchema.parse(Res)
                res.status(200).json(verifyPayload)
            } else {
                res.status(409).json({ 
                    error_code: "DOUBLE_REPORT",
                    error_description: "Leitura do mês já realizada"
                 })
            }

        } catch (error) {

            return next(error)
        }
       
    }
}
    

export default new UploadController()
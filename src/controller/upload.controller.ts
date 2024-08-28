import { Response, Request } from "express";
import UploadSchema from "../schema/upload.shema";


class UploadController {
    
    upload = (req: Request, res: Response) => {
        const verifyPayload = UploadSchema.uploadSchema.parse(req.body)

        res.send(verifyPayload)
    }
}
    

export default new UploadController()
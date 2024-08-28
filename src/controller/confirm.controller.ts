import { Response, Request } from "express";
import measureShema from "../schema/measure.shema";


class ConfirmController {

    confirm = (req: Request, res: Response) => {

        const verifyPayload = measureShema.meansureConfirmSchema.parse(req.body)


        

        res.send({success: true})
    }

}
export default new ConfirmController()
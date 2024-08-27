import { Response, Request } from "express";

const confirm = (req: Request, res: Response) => {
    res.send("OK")
}


export default { confirm }
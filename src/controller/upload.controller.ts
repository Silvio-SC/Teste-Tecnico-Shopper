import { Response, Request } from "express";

const upload = (req: Request, res: Response) => {
    res.send("OK")
}


export default { upload }
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class handleErrors {
  
  handleErrors( 
      error: unknown, req: Request, res: Response, next: NextFunction
  ): Response {
    console.log("handleErrors funcioando")

    if (error instanceof z.ZodError) {
      return res.status(400).json(
        {
          "error_code": "INVALID_DATA",
          "error_description": error.flatten().fieldErrors
        })
    }
    console.log(error)
    return res.status(500).json({ message: "Internal server error." });
  }
}

export default new handleErrors()
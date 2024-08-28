import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class handleErrors {

    handleErrorFunction( 
        error: unknown, req: Request, res: Response, next: NextFunction
    ): Response {
    
      if (error instanceof z.ZodError) {
        return res.status(400).json({
            "error_code": "INVALID_DATA",
            "error_description": error.flatten().fieldErrors
        }
        )
      }
    
      return res.status(500).json({ message: "Internal server error." });
    };

}

export default new handleErrors()
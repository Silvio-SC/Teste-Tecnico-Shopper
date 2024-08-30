import { NextFunction, Request, Response } from "express";
import prismaService from "./prisma.service";
import MeasureSchema from "../schema/measure.shema";




class CustomerService {

    findCustomerMeasures = async (req: Request, res: Response) => {
        const { customerCode } = req.params
        let menasureList: any = [];

            if (req.query.measure_type) {
                const measureType = MeasureSchema.meansureTypeConfirmSchema.parse(req.query).measure_type
                
                menasureList = await prismaService.$queryRaw`
                    SELECT 
                        "id" AS "measure_uuid",
                        "dateTime" AS "measure_datetime",
                        "type" AS "measure_type",
                        "confirmed" AS "has_confirmed",
                        "image_url"
                    FROM "meansure"
                    WHERE "customer_code" = ${customerCode} AND "type" = ${measureType}::"Type";
                `;
            }else {
                menasureList = await prismaService.$queryRaw`
                SELECT 
                    "id" AS "measure_uuid",
                    "dateTime" AS "measure_datetime",
                    "type" AS "measure_type",
                    "confirmed" AS "has_confirmed",
                    "image_url"
                FROM "meansure"
                WHERE "customer_code" = ${customerCode};
                `;
            }  

        if (menasureList.length === 0) {
            res.status(404).json({
                "error_code": "MEASURES_NOT_FOUND",
                "error_description": "Nenhuma leitura encontrada"
            })
        }

        return {
            customer_code: customerCode,
            measures: MeasureSchema.meansuresListSchema.parse(menasureList)
        }
    }

}

export default new CustomerService()
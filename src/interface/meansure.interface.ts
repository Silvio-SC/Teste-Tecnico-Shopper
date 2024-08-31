import { z } from "zod";
import MeasureSchema from "../schema/measure.shema";
 
type IMeansure = z.infer<typeof MeasureSchema.meansureSchema>

interface ICostumerMeansure{
    id: string;
    dateTime: Date;
    type: string;
    value: number;
    image_url: string;
    confirmed: boolean;
    customer_code: string;
}


export { IMeansure, ICostumerMeansure }
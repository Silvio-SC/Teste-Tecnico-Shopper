import { z } from "zod";
import MeasureSchema from "../schema/measure.shema";
 
type IMeansure = z.infer<typeof MeasureSchema.meansureSchema>


export { IMeansure }
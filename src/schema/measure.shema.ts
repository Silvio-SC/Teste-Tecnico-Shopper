import { z } from "zod";

class MeasureSchema {
    
    meansureSchema = z.object({
        measure_uuid: z.string().uuid(),
        measure_datetime: z.string().datetime(),
        measure_type: z.enum(["WATER", "GAS"]),
        has_confirmed:z.boolean(),
        image_url: z.string()
    })
    
    meansureConfirmSchema = z.object({
        measure_uuid: z.string().uuid(),
        confirmed_value:z.boolean()
    })
}

export default new MeasureSchema()
import { z } from "zod";

class MeasureSchema {
    
    meansureSchema = z.object({
        measure_uuid: z.string().uuid(),
        measure_datetime: z.date(),
        measure_type: z.enum(["WATER", "GAS"]),
        has_confirmed:z.boolean(),
        image_url: z.string()
    })
    
    meansureConfirmSchema = z.object({
        measure_uuid: z.string().uuid(),
        confirmed_value :z.number().positive().max(2147483647)
    })

    meansureTypeConfirmSchema = this.meansureSchema.pick({measure_type: true})
    meansuresListSchema = this.meansureSchema.array()

}

export default new MeasureSchema()
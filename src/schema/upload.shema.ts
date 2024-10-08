import { z } from "zod";

    
    const uploadSchema = z.object({
        image: z.string().base64(),
        customer_code: z.string(),
        measure_datetime: z.string().datetime(),
        measure_type: z.enum(["WATER", "GAS"])
    })
    
    const meansureResponseSchema = z.object({
        measure_uuid: z.string().uuid(),
        measure_value: z.number().positive(),
        image_url: z.string().url()
    })


export default {uploadSchema, meansureResponseSchema}
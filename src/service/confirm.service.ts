import "dotenv/config";
import measureShema from "../schema/measure.shema";
import prismaService from "./prisma.service";


class ConfirmService {

    confirm = async (verifyPayload: any, res: any) => {
    

        const FoundedMeansure = await prismaService.meansure.findUnique(
            { where: { id: verifyPayload.measure_uuid } }
        )

        if (FoundedMeansure?.confirmed) {
            res.status(404).json({
                "error_code": "CONFIRMATION_DUPLICATE",
                "error_description": "Leitura do mês já realizada"
            }) 
        }

        await prismaService.meansure.update(
            { 
                where: { id: verifyPayload.measure_uuid }, 
                data: {
                        confirmed: true,
                        value: verifyPayload.confirmed_value
                    } 
            }
        
        )
    }

}


export default new ConfirmService()
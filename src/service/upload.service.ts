import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PrismaService from "./prisma.service";
import { IUploadReq } from "../interface/upload.interface";

class UploadService {

    upload = async (verifyPayload: IUploadReq) => {
        
        const costumerMeansures = await PrismaService.meansure.findMany(
            { where: { customer_code: verifyPayload.customer_code } }
        ) 
        
        const meansureOfSameMonth = costumerMeansures.map((x) => x.dateTime.toISOString().split('-')[1]
            ).find((x) => x! === verifyPayload.measure_datetime.split('-')[1])


        if (!meansureOfSameMonth) {
            const imageValue = parseInt(await this.readImageWithGemini(verifyPayload.image))
            const imageUrl = await this.saveImageTemporarily(verifyPayload.image)

            const Resp = await PrismaService.meansure.create({ 
                data: 
                    { 
                        image_url: imageUrl, 
                        value: imageValue, 
                        customer_code: verifyPayload.customer_code, 
                        dateTime: verifyPayload.measure_datetime, 
                        type: verifyPayload.measure_type 
                    } 
            })

            const RespConverted = {
                measure_uuid: Resp.id,
                measure_value: Resp.value,
                image_url: Resp.image_url
            }

            return RespConverted
        } else {
            return null
        }


    }

    readImageWithGemini = async (imageBase64: string): Promise<string> => {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        });

        // Upload file ...

        // Generate content using text and the URI reference for the uploaded file.
        function fileToGenerativePart() {
            return {
              inlineData: {
                data: imageBase64, 
                mimeType: "image/jpeg"
              },
            };
          }

        // Output the generated text to the console

        const prompt = "tell me what the measured value is in the image only the number"
        const image = fileToGenerativePart();
    
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        return response.text();


    }

    saveImageTemporarily = async (image: string): Promise<string> => {
        const URL = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;

        const form = new FormData();
        form.append('image', image);

        const text = async (): Promise<string> => {
            try {
                const resultado = await fetch(URL, {
                    method: 'POST',
                    body: form
                })
                const body = await resultado.json()

                return body.data.url
            } catch (e: any) {
                return e.message
            }
        };

        const res = await text()
        return res
    }

}


export default new UploadService()
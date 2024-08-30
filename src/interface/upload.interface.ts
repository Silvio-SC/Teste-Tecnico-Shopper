
export interface IUploadReq {
    customer_code: string;
    measure_datetime: string;
    image: string;
    measure_type: "WATER" | "GAS";
}
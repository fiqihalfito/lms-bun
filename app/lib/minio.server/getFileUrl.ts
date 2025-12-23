import { minioConnect } from "./connect";


export const getFileUrl = (filename: string) => {
    const url = minioConnect.presign(filename, {
        expiresIn: 60
    })
    return url;
}
import { NextFunction, Request, Response } from 'express'
import { MulterError } from 'multer'
const multer = require('multer')

export const UploadImageMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const storage = multer.diskStorage({
        destination: function (req: Request, file: File, cb: (arg0: null, arg1: string) => void) {
            cb(null, './uploads')
        },
        filename: function (req: Request, file: { fieldname: string }, cb: (arg0: null, arg1: string) => void) {
            cb(null, `${file.fieldname}${Date.now()}.jpg`)
        }
    })

    const upload = multer({ storage }).single('image')

    upload(request, response, function (err: MulterError) {
        if (err instanceof multer.MulterError) {
            response.status(500).send(err)
            return
        }
        console.log(request.file?.filename);
        next()
    })
}
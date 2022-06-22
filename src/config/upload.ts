import path from 'node:path'
import crypto from 'node:crypto'
import multer from 'multer'

const uploadFolder = path.resolve('config', '..', 'uploads')

export const uploadConfig = {
	directory: uploadFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex')
			const fileName = `${fileHash}-${file.originalname}`

			callback(null, fileName)
		},
	}),
}

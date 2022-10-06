import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import '@shared/typeorm'
import { errors } from 'celebrate'
import uplaodConfig from '@config/Upload'
import { pagination } from 'typeorm-pagination'

const app = express()

app.use(cors())
app.use(express.json())
app.use(pagination)
app.use('/files', express.static(uplaodConfig.directory))
app.use(routes)
app.use(errors())

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    })
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  })
})

app.listen(8000, () => {
  console.log('server started in localhost:8000')
})

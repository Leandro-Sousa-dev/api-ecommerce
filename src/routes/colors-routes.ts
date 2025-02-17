import { Router } from 'express'
import { ColorsController } from '../http/controllers/colors-controller'

const colorsRoutes = Router()

colorsRoutes.get('/', new ColorsController().findAll)
colorsRoutes.post('/', new ColorsController().create)
colorsRoutes.delete('/:id', new ColorsController().destroy)

export { colorsRoutes }

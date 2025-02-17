import { Router } from 'express'
import { SizesController } from '../http/controllers/sizes-controller'

const sizesRoutes = Router()

sizesRoutes.get('/', new SizesController().findAll)
sizesRoutes.post('/', new SizesController().create)
sizesRoutes.delete('/:id', new SizesController().destroy)

export { sizesRoutes }

import { Router } from 'express'
import { ProductsController } from '../http/controllers/products-controller'
import { UploadImageMiddleware } from '../middlewares/product-image'
const productsRoutes = Router()

productsRoutes.get('/', new ProductsController().findAll)
productsRoutes.post('/', UploadImageMiddleware, new ProductsController().create)
productsRoutes.put('/:id', new ProductsController().update)
productsRoutes.delete('/:id', new ProductsController().destroy)

export { productsRoutes }

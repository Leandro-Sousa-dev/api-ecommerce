import { Router } from 'express'
import { ProductsController } from '../http/controllers/products-controller'

const productsRoutes = Router()

productsRoutes.get('/', new ProductsController().findAll)
productsRoutes.post('/', new ProductsController().create)
productsRoutes.put('/:id', new ProductsController().update)
productsRoutes.delete('/:id', new ProductsController().destroy)

export { productsRoutes }

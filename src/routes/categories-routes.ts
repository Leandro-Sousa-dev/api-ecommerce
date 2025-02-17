import { Router } from 'express'
import { CategoriesController } from '../http/controllers/categories-controller'

const categoriesRoutes = Router()

categoriesRoutes.get('/', new CategoriesController().findAll)
categoriesRoutes.post('/', new CategoriesController().create)
categoriesRoutes.delete('/:id', new CategoriesController().destroy)

export { categoriesRoutes }

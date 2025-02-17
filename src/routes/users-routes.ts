import { Router } from 'express'
import { UsersController } from '../http/controllers/users-controller'
import { authMiddleware } from '../middlewares/auth'

const usersRoutes = Router()

usersRoutes.post('/', new UsersController().create) // criar a conta do usuário
usersRoutes.post('/login', new UsersController().login) // autenticar o usuário
usersRoutes.get('/', authMiddleware, new UsersController().profile) // obtém o perfil do usuário

export { usersRoutes }

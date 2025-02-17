import { app } from './app'
import { productsRoutes } from './routes/products-routes'
import { usersRoutes } from './routes/users-routes'

const port = 3333

app.listen(port, () => {
    console.log('🚀 HTTP Server Running!')
})

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)

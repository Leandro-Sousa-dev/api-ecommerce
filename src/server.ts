import { app } from './app'
import { categoriesRoutes } from './routes/categories-routes'
import { colorsRoutes } from './routes/colors-routes'
import { productsRoutes } from './routes/products-routes'
import { sizesRoutes } from './routes/sizes-routes'
import { usersRoutes } from './routes/users-routes'

const port = 3333

app.listen(port, () => {
    console.log('🚀 HTTP Server Running!')
})

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/admin/colors', colorsRoutes)
app.use('/admin/sizes', sizesRoutes)
app.use('/admin/categories', categoriesRoutes)

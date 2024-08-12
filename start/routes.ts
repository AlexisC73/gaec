/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/auth/registers_controller')
const CreateProductsController = () => import('#controllers/products/create_products_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const AddProductToBasketsController = () =>
  import('#controllers/baskets/add_product_to_baskets_controller')
const DeleteProductFromBasketsController = () =>
  import('#controllers/baskets/delete_product_from_baskets_controller')
const UpdateProductQuantityController = () => import('#controllers/baskets/update_product_quantity')
const DeleteProductController = () => import('#controllers/products/delete_products_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [RegistersController, 'handle'])
        router.post('/login', [LoginController, 'handle'])
      })
      .prefix('auth')

    router
      .group(() => {
        router.post('/product', [AddProductToBasketsController, 'handle'])
        router.delete('/product/:id', [DeleteProductFromBasketsController, 'handle'])
        router.patch('/product/:id', [UpdateProductQuantityController, 'handle'])
      })
      .prefix('baskets')

    router
      .group(() => {
        router.post('/', [CreateProductsController, 'handle'])
        router.delete('/:id', [DeleteProductController, 'handle'])
      })
      .prefix('products')
  })
  .prefix('api')

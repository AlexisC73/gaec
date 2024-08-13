/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/auth/registers_controller')
const CreateProductsController = () =>
  import('#controllers/admin/products/create_products_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const AddProductToBasketsController = () =>
  import('#controllers/baskets/add_product_to_baskets_controller')
const DeleteProductFromBasketsController = () =>
  import('#controllers/baskets/delete_product_from_baskets_controller')
const UpdateProductQuantityController = () => import('#controllers/baskets/update_product_quantity')
const DeleteProductController = () =>
  import('#controllers/admin/products/delete_products_controller')
const GetProductsController = () => import('#controllers/products/get_products_controller')
const UpdateProductPublishedsController = () =>
  import('#controllers/admin/products/update_product_publisheds_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('/', [CreateProductsController, 'handle'])
            router.delete('/:id', [DeleteProductController, 'handle'])
          })
          .prefix('products')
      })
      .prefix('admin')

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
        router.patch('/:id', [UpdateProductPublishedsController, 'handle'])
      })
      .prefix('products')
  })
  .prefix('api')

router
  .group(() => {
    router.get('/', [GetProductsController, 'view'])
  })
  .prefix('products')

router
  .group(() => {
    router.get('/login', [LoginController, 'view'])
  })
  .prefix('auth')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [GetProductsController, 'viewAdmin'])
      })
      .prefix('products')
  })
  .prefix('admin')

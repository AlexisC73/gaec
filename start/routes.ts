/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/auth/registers_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [RegistersController, 'handle'])
      })
      .prefix('auth')
  })
  .prefix('api')

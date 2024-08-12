import User from '#models/user'
import { createLoginValidator } from '#validators/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async handle({ request, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const validateData = await createLoginValidator.validate({ email, password })
      const user = await User.verifyCredentials(validateData.email, validateData.password)
      await auth.use('web').login(user)
      return
    } catch (e) {
      return e
    }
  }
}

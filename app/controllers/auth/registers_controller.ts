import User from '#models/user'
import { createPostValidator } from '#validators/auth/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistersController {
  async handle({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const validateData = await createPostValidator.validate({ email, password })

      const userExists = await User.findBy('email', validateData.email)
      if (userExists) {
        return response.badRequest()
      }

      await User.create({
        email: validateData.email,
        password: validateData.password,
        role: 'user',
      })

      return response.created()
    } catch (e) {
      return e
    }
  }
}

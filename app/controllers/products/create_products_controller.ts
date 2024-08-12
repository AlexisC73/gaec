import Product from '#models/product'
import { createProductValidator } from '#validators/products/create_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateProductsController {
  async handle({ request, response, auth }: HttpContext) {
    try {
      const authUser = await auth.authenticate()
      if (authUser.role !== 'admin') {
        return response.unauthorized({
          message: 'Unauthorized',
        })
      }
      const { name, price } = request.only(['name', 'price'])
      const validateData = await createProductValidator.validate({ name, price })
      const alreadyExist = await Product.findBy('name', validateData.name)
      if (alreadyExist) {
        return response.badRequest({
          message: 'Product already exist',
        })
      }
      await Product.create({
        name: validateData.name,
        price: validateData.price,
      })

      return response.created()
    } catch (e) {
      return e
    }
  }
}

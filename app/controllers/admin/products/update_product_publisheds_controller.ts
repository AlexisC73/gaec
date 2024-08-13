import Product from '#models/product'
import { udpateProductPublishedValidator } from '#validators/products/update_product_published'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateProductPublishedsController {
  async handle({ request, response, auth }: HttpContext) {
    try {
      const authUser = await auth.authenticate()
      if (authUser.role !== 'admin') {
        return response.unauthorized({
          message: 'Unauthorized',
        })
      }
      const { id } = request.params()
      const { published } = request.only(['published'])

      const validateData = await udpateProductPublishedValidator.validate({
        productId: id,
        published,
      })

      const product = await Product.findBy('id', validateData.productId)
      if (!product) {
        return response.notFound({
          message: 'Product not found',
        })
      }

      product.published = validateData.published
      await product.save()

      return response.noContent()
    } catch (e) {
      return e
    }
  }
}

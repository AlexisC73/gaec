import Product from '#models/product'
import { deleteProductValidator } from '#validators/products/delete_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteProductController {
  async handle({ auth, response, request }: HttpContext) {
    const authUser = await auth.authenticate()
    if (authUser.role !== 'admin') {
      return response.forbidden({ message: 'You are not authorized to access this resource' })
    }
    const { id: productId } = request.params()

    const validateData = await deleteProductValidator.validate({ productId })

    const product = await Product.findBy('id', validateData.productId)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    await product.delete()
    return response.noContent()
  }
}

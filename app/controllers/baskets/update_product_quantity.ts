import Basket from '#models/basket'
import BasketProduct from '#models/basket_product'
import { createUpdateProductQuantity } from '#validators/baskets/update_product_quantity'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateProductQuantityController {
  async handle({ request, response, auth }: HttpContext) {
    try {
      const authUser = await auth.authenticate()

      const { id: productId } = request.params()

      const { quantity } = request.only(['productId', 'quantity'])

      const basket = await Basket.query()
        .select('*')
        .from('baskets')
        .where('customer_id', authUser.id)
        .where('ordered', false)
        .first()

      const validateData = await createUpdateProductQuantity.validate({
        productId,
        quantity,
      })

      if (basket) {
        const existProductInBasket = await BasketProduct.query()
          .select('*')
          .from('basket_products')
          .where('basket_id', basket.id)
          .where('product_id', validateData.productId)
          .first()
        if (existProductInBasket) {
          existProductInBasket.quantity = validateData.quantity
          await existProductInBasket.save()
          return response.noContent()
        }
      }

      return response.notFound({ message: 'Product not found' })
    } catch (e) {
      return e
    }
  }
}

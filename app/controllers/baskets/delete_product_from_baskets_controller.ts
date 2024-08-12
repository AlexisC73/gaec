import Basket from '#models/basket'
import BasketProduct from '#models/basket_product'
import { createDeleteProductFromBasket } from '#validators/baskets/delete_product_from_basket'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteProductFromBasketsController {
  async handle({ request, auth, response }: HttpContext) {
    const authUser = await auth.authenticate()
    const { id } = request.params()

    const validateData = await createDeleteProductFromBasket.validate({ productId: id })

    const basket = await Basket.query()
      .select('*')
      .where('customer_id', authUser.id)
      .where('ordered', false)
      .first()

    if (!basket) {
      return response.notFound({ message: 'Basket not found' })
    }

    const basketProduct = await BasketProduct.query()
      .where('basket_id', basket.id)
      .where('product_id', validateData.productId)
      .first()

    await basketProduct?.delete()
    return response.noContent()
  }
}

import Basket from '#models/basket'
import BasketProduct from '#models/basket_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteProductFromBasketsController {
  async handle({ request, auth, response }: HttpContext) {
    const authUser = await auth.authenticate()
    const { id } = request.params()

    //TODO: implement validation for id

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
      .where('product_id', id)
      .first()

    await basketProduct?.delete()
    return response.noContent()
  }
}

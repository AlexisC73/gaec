import Basket from '#models/basket'
import BasketProduct from '#models/basket_product'
import Product from '#models/product'
import { createAddProductToBasket } from '#validators/baskets/add_product_to_basket'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AddProductToBasketsController {
  async handle({ request, response, auth }: HttpContext) {
    try {
      const authUser = await auth.authenticate()

      const { quantity, productId } = request.only(['productId', 'quantity'])
      const basket = await Basket.query()
        .select('*')
        .from('baskets')
        .where('customer_id', authUser.id)
        .where('ordered', false)
        .first()

      const validateData = await createAddProductToBasket.validate({
        productId: productId,
        quantity,
      })

      const existingProduct = await Product.findBy('id', validateData.productId)

      if (!existingProduct) {
        return response.notFound({ message: 'Product not found' })
      }

      if (basket) {
        const existProductInBasket = await BasketProduct.query()
          .select('*')
          .from('basket_products')
          .where('basket_id', basket.id)
          .where('product_id', validateData.productId)
          .first()
        if (existProductInBasket) {
          existProductInBasket.quantity += validateData.quantity
          await existProductInBasket.save()
          return
        }
      }

      await db.transaction(async () => {
        let basketId = basket?.id
        if (!basket) {
          const newBasket = await Basket.create({ customerId: authUser.id })
          basketId = newBasket.id
        }
        await BasketProduct.create({
          basketId,
          productId: validateData.productId,
          quantity: validateData.quantity,
        })
      })

      return response.created()
    } catch (e) {
      return e
    }
  }
}

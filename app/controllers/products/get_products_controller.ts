import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetProductsController {
  async view({ inertia }: HttpContext) {
    try {
      const products = await Product.query().select('*').where('published', true)
      return inertia.render('home', { products })
    } catch (e) {
      return e
    }
  }

  async viewAdmin({ inertia, auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()
      if (user.role !== 'admin') {
        return response.redirect('/products')
      }
      const products = await Product.all()
      return inertia.render('admin/products', { products })
    } catch (e) {
      return e
    }
  }
}

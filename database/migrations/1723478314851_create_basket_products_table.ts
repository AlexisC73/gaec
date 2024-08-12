import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'basket_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('basket_id').references('baskets.id').onDelete('CASCADE')
      table.uuid('product_id').references('products.id').onDelete('RESTRICT')
      table.integer('quantity').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['basket_id', 'product_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

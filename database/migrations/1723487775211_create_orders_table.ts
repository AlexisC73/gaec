import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('price').notNullable()
      table.string('contact_number').notNullable()
      table.uuid('customer_id').references('users.id').onDelete('SET NULL')
      table.string('ip_adrress').notNullable()
      table.uuid('basket_id').references('baskets.id').onDelete('RESTRICT')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Basket from './basket.js'
import { randomUUID } from 'node:crypto'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare price: string

  @column()
  declare contactNumber: string

  @column({ columnName: 'customer_id' })
  declare customerId: string | null

  @belongsTo(() => User, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof User>

  @column()
  declare ipAddress: string

  @column()
  declare basketId: string

  @belongsTo(() => Basket)
  declare basket: BelongsTo<typeof Basket>

  @column()
  declare status: 'waiting_confirmation' | 'confirmed' | 'cancelled' | 'delivered'

  @column()
  declare cancelReason: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Runs before creating a new record
   */
  @beforeCreate()
  static async addUUID(model: Order) {
    model.id = model.id || randomUUID()
  }
}

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Basket extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare customerId: string

  @belongsTo(() => User, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof User>

  @column()
  declare ordered: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Runs before creating a new record
   */
  @beforeCreate()
  static async addUUID(model: Basket) {
    model.id = model.id || randomUUID()
  }
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Basket from './basket.js'

export default class BasketProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare basketId: string
  @belongsTo(() => Basket, {
    foreignKey: 'basketId',
  })
  declare basket: BelongsTo<typeof Basket>

  @column()
  declare productId: string | null
  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>

  @column()
  declare quantity: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

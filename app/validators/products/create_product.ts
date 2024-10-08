import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number(),
    quantityType: vine.enum(['unit', 'weight']),
  })
)

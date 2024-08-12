import vine from '@vinejs/vine'

export const createUpdateProductQuantity = vine.compile(
  vine.object({
    productId: vine.string(),
    quantity: vine.number(),
  })
)

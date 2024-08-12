import vine from '@vinejs/vine'

export const createDeleteProductFromBasket = vine.compile(
  vine.object({
    productId: vine.string(),
  })
)

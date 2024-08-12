import vine from '@vinejs/vine'

export const createAddProductToBasket = vine.compile(
  vine.object({
    productId: vine.string(),
    quantity: vine.number(),
  })
)

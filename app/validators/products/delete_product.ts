import vine from '@vinejs/vine'

export const deleteProductValidator = vine.compile(
  vine.object({
    productId: vine.string(),
  })
)

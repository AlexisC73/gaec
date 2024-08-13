import vine from '@vinejs/vine'

export const udpateProductPublishedValidator = vine.compile(
  vine.object({
    productId: vine.string(),
    published: vine.boolean(),
  })
)

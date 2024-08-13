import { ToggleButton } from '~/components/ui/toggle_button/toggle_button'

export interface AdminProductCardProps {
  id: string
  name: string
  price: number
  quantityType: 'unit' | 'weight'
  image?: string
  published: boolean
}

export function AdminProductCard({
  id,
  name,
  price,
  quantityType,
  image,
  published,
}: AdminProductCardProps) {
  const handleOnToggleAction = (active: boolean) => {
    fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ published: active }),
      credentials: 'include',
    })
  }

  return (
    <div className="w-full flex gap-x-4 items-center">
      <img
        src={image ?? 'https://via.placeholder.com/80'}
        alt="product_cover"
        className="rounded-lg w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <p className="font-bold text-gray-8">{name}</p>
        <p className="text-gray-5">
          {(price / 100).toFixed(2)}€/{quantityType === 'unit' ? 'each' : 'kg'}
        </p>
      </div>
      <div>
        <p>Publié</p>
        <ToggleButton onToggleAction={handleOnToggleAction} defaultValue={published} />
      </div>
    </div>
  )
}

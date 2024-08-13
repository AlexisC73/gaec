import Product from '#models/product'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { LucideSearch } from '~/assets/icons'

export default function Home({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <>
      <Head title="Homepage" />
      <div className="py-2 px-4 rounded-lg flex gap-x-2 items-center bg-gray-1">
        <LucideSearch className="text-5" />
        <input
          type="search"
          placeholder="Search for products"
          className="bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="flex my-4 gap-x-4">
        <CategoryTab name="Tous" active />
        <CategoryTab name="Fruits" />
        <CategoryTab name="Légumes" />
        <CategoryTab name="Autres" />
      </div>

      <div id="products-list" className="flex flex-col gap-y-4 mt-8">
        {filteredProducts.map((p, index) => (
          <>
            {index !== 0 && <div key={`divider-${p.id}`} className="h-px w-full bg-gray-2"></div>}
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              quantityType={p.quantityType}
            />
          </>
        ))}
      </div>
    </>
  )
}

export function CategoryTab({ name, active = false }: { name: string; active?: boolean }) {
  const customClassses = active ? 'bg-blue-5 text-white' : 'bg-gray-1'
  return <button className={`px-4 py-1 rounded-lg font-medium ${customClassses}`}>{name}</button>
}

export interface ProductCardProps {
  id: string
  name: string
  price: number
  quantityType: 'unit' | 'weight'
  image?: string
}

export function ProductCard({ name, price, quantityType, image }: ProductCardProps) {
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
      <button className="text-8">+</button>
    </div>
  )
}

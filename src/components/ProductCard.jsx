import { Link } from 'react-router-dom'
import { formatPrice } from '../data/adaptProducts'

export default function ProductCard({ product }) {
  return (
    <Link to={`/items/${product.id}`} className="group block">
      <div className="overflow-hidden bg-neutral-900">
        <img
          src={product.photo}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>

      <div className="flex items-baseline justify-between gap-3 pt-3 text-sm">
        <span className="transition group-hover:text-amber-400">{product.name}</span>
        <span className="text-neutral-500">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import FavoriteButton from '../components/FavoriteButton'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/adaptProducts'

export default function ItemDetail() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addItem } = useCart()

  const product = products.find((item) => item.id === Number(id))

  if (loading) {
    return <p className="page text-neutral-500">Loading…</p>
  }

  if (!product) {
    return (
      <div className="page">
        <h1 className="text-3xl">Not found.</h1>
        <Link to="/items" className="btn-outline mt-8">
          Back to the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link
        to="/items"
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400"
      >
        <ArrowLeft size={16} />
        Menu
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <img
          src={product.photo}
          alt={product.name}
          className="aspect-square w-full object-cover grayscale transition duration-500 hover:grayscale-0"
        />

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl">{product.name}</h1>
            <FavoriteButton id={product.id} />
          </div>

          <p className="mt-4 text-2xl text-amber-400">{formatPrice(product.price)}</p>
          <p className="mt-6 text-neutral-400">{product.desc}</p>

          <button onClick={() => addItem(product)} className="btn mt-10 w-full sm:w-auto">
            <Plus size={16} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/adaptProducts'

export default function Cart() {
  const { items, changeQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="page">
        <h1 className="text-3xl">Your cart is empty</h1>
        <p className="mt-4 text-neutral-500">Go pick something good.</p>
        <Link to="/items" className="btn mt-8">
          See the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="border-b border-neutral-800 pb-4 text-3xl">Your cart</h1>

      <div className="pt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 border-b border-neutral-900 py-5"
          >
            <img
              src={item.photo}
              alt={item.name}
              className="h-20 w-20 object-cover grayscale transition group-hover:grayscale-0"
            />

            <div className="flex-1">
              <Link to={`/items/${item.id}`} className="hover:text-amber-400">
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">{formatPrice(item.price)} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => changeQuantity(item.id, -1)}
                className="text-neutral-500 hover:text-amber-400"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => changeQuantity(item.id, 1)}
                className="text-neutral-500 hover:text-amber-400"
              >
                <Plus size={16} />
              </button>
            </div>

            <span className="w-20 text-right text-sm">
              {formatPrice(item.price * item.quantity)}
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className="text-neutral-600 hover:text-amber-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-8">
        <div>
          <p className="section-title">Total</p>
          <p className="mt-2 text-3xl text-amber-400">{formatPrice(total)}</p>
        </div>
        <Link to="/checkout" className="btn">
          Checkout
        </Link>
      </div>
    </div>
  )
}

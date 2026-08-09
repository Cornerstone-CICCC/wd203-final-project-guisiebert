import { Link, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/adaptProducts'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()

  function handleConfirm() {
    clearCart()
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <h1 className="text-3xl">Nothing to check out</h1>
        <Link to="/items" className="btn mt-8">
          See the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="page max-w-xl">
      <h1 className="text-3xl">Checkout</h1>
      <p className="mt-4 text-neutral-500">Pick it up at the counter in about 10 minutes.</p>

      <div className="mt-8 border-y border-neutral-800 py-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2 text-sm">
            <span className="text-neutral-400">
              {item.quantity} × {item.name}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 text-lg">
        <span className="text-neutral-500">Total</span>
        <span className="text-amber-400">{formatPrice(total)}</span>
      </div>

      <button onClick={handleConfirm} className="btn mt-10 w-full">
        <Check size={16} />
        Confirm order
      </button>
    </div>
  )
}

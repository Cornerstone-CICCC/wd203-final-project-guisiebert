import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductsContext'
import { useFavorites } from '../context/FavoritesContext'

// The featured items grouped by time of day 
const MOMENTS = [
  {
    title: 'Morning',
    hours: '7am – 11am',
    text: 'Baked before sunrise, gone by noon.',
    ids: [26, 27, 28, 30],
  },
  {
    title: 'Lunch',
    hours: '11am – 3pm',
    text: 'Plates from around the world.',
    ids: [18, 31, 33, 42],
  },
  {
    title: 'Afternoon',
    hours: '3pm – 6pm',
    text: 'Fresh and delicious.',
    ids: [21, 25, 43, 45],
  },
]

export default function Home() {
  const { products, loading } = useProducts()
  const { favoriteIds } = useFavorites()

  const favorites = products.filter((product) => favoriteIds.includes(product.id))

  return (
    <>
      {/* Hero section */}
      <section className="relative flex h-[85vh] min-h-130 items-end">
        <img src="/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-neutral-950/60" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
          <p className="section-title">Vancouver, BC</p>
          <h1 className="mt-4 text-6xl tracking-tight lowercase sm:text-8xl">
            gimme<span className="font-extrabold">coffee</span>
          </h1>
          <p className="mt-6 max-w-md text-neutral-300">
            Come grab coffee and food in the heart of Vancouver. We roast our own coffee and cook a
            big variety of global plates.
          </p>
          <Link to="/items" className="btn mt-8">
            See the menu
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Products section */}
      <div className="page space-y-20">
        {loading && <p className="text-neutral-500">Loading the menu…</p>}

        {/* Favorites section */}
        {favorites.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between border-b border-neutral-800 pb-4">
              <h2 className="flex items-center gap-2 text-2xl">
                <Star size={20} className="fill-amber-400 text-amber-400" />
                Your favorites
              </h2>
              <span className="section-title">{favorites.length} saved</span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 md:grid-cols-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Moments section */}
        {MOMENTS.map((moment) => (
          <section key={moment.title}>
            <div className="flex items-baseline justify-between border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-2xl">{moment.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">{moment.text}</p>
              </div>
              <span className="section-title">{moment.hours}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 md:grid-cols-4">
              {products
                .filter((product) => moment.ids.includes(product.id))
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </section>
        ))}

        {/* Visit us section */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          <img
            src="/cafe.jpg"
            alt="Inside the shop"
            className="aspect-4/3 w-full object-cover grayscale transition duration-500 hover:grayscale-0"
          />
          <div>
            <p className="section-title">Visit us</p>
            <h2 className="mt-4 text-3xl">978 Granville St</h2>
            <p className="mt-4 text-neutral-400">
              Come visit us at the heart of Vancouver in Granville St. We're located right in the
              same building as the internationally known Cornerstone Community College.
            </p>
            <Link to="/items" className="btn-outline mt-8">
              Order ahead
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

import { Star } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ id }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      onClick={() => toggleFavorite(id)}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-2 transition hover:text-amber-400 ${active ? 'text-amber-400' : 'text-neutral-400'}`}
    >
      <Star size={18} className={active ? 'fill-amber-400' : ''} />
    </button>
  )
}

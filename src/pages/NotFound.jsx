import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <p className="section-title">404</p>
      <h1 className="mt-4 text-4xl">Not found.</h1>
      <p className="mt-4 text-neutral-500">
        We couldn't find the page you were looking for.
      </p>
      <Link to="/" className="btn mt-8">
        Back home
      </Link>
    </div>
  )
}

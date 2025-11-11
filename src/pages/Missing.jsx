import { Link } from 'react-router-dom'

export default function Missing() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  )
}

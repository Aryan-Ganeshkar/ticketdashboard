import { Link } from 'react-router-dom'

export default function Card({ ticket }) {
  const statusColors = {
    open: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    closed: 'bg-green-100 text-green-800 border-green-300'
  }
  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <Link
      to={`/ticket/${ticket.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[ticket.priority]}`}>
              {ticket.priority.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {ticket.category}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusColors[ticket.status]}`}>
          {ticket.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
    </Link>
  )
}

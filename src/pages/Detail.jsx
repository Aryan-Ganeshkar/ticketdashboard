import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTickets } from '../App.jsx'

export default function Detail() {
  const { id } = useParams()
  const tid = Number(id)
  const navigate = useNavigate()
  const { tickets, updateTicket, deleteTicket } = useTickets()
  const ticket = useMemo(() => tickets.find(t => t.id === tid), [tickets, tid])

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ticket Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  const setStatus = (s) => updateTicket(ticket.id, { status: s })
  const onDelete = () => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(ticket.id)
      navigate('/')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{ticket.title}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">#{ticket.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>{ticket.priority.toUpperCase()}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {ticket.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>{ticket.status.replace('-', ' ').toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="font-medium">{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="font-medium">{new Date(ticket.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-3">
              {['open', 'in-progress', 'closed'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    ticket.status === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={onDelete}
              className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Delete Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

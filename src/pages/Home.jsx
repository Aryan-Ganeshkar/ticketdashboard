import { useMemo, useState } from 'react'
import Card from '../components/Card.jsx'
import Stat from '../components/Stat.jsx'
import { useTickets } from '../App.jsx'

export default function Home() {
  const { tickets } = useTickets()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }), [tickets])

  const list = useMemo(() => {
    let arr = [...tickets]
    if (filter !== 'all') arr = arr.filter(t => t.status === filter)
    if (q.trim()) {
      const s = q.toLowerCase()
      arr = arr.filter(t =>
        t.title.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s) ||
        String(t.id).includes(s)
      )
    }
    if (sortBy === 'recent') {
      arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    } else if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 }
      arr.sort((a, b) => order[a.priority] - order[b.priority])
    } else if (sortBy === 'status') {
      const order = { open: 0, 'in-progress': 1, closed: 2 }
      arr.sort((a, b) => order[a.status] - order[b.status])
    }
    return arr
  }, [tickets, filter, q, sortBy])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Tickets" value={stats.total} color="border-blue-600" icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        } />
        <Stat title="Open" value={stats.open} color="border-yellow-600" icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        } />
        <Stat title="In Progress" value={stats.inProgress} color="border-blue-600" icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        } />
        <Stat title="Closed" value={stats.closed} color="border-green-600" icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        } />
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Tickets</h2>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              placeholder="Search by title, desc, #id"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="recent">Sort: Recent</option>
              <option value="priority">Sort: Priority</option>
              <option value="status">Sort: Status</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'open', 'in-progress', 'closed'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {list.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">No tickets found</p>
            </div>
          ) : (
            list.map(t => <Card key={t.id} ticket={t} />)
          )}
        </div>
      </div>
    </div>
  )
}

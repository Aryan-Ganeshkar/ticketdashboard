import { useMemo, useState } from 'react'
import Card from '../components/Card.jsx'
import Stat from '../components/Stat.jsx'
import { useTickets } from '../App.jsx'

export default function Home() {
  const { tickets } = useTickets()
  const [filter, setFilter] = useState('all')

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }), [tickets])

  const list = useMemo(() => {
    let arr = [...tickets]
    if (filter !== 'all') arr = arr.filter(t => t.status === filter)
    arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return arr
  }, [tickets, filter])

  return (
    <div className="space-y-8">

      <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50 border border-white/60 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <Stat
            title="Total Tickets"
            value={stats.total}
            color="sky"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              </svg>}
          />

          <Stat
            title="Open"
            value={stats.open}
            color="amber"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
          />

          <Stat
            title="In Progress"
            value={stats.inProgress}
            color="indigo"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
          />

          <Stat
            title="Closed"
            value={stats.closed}
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
          />

        </div>
      </div>

      
      <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-5">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Tickets</h2>

          <div className="flex flex-wrap gap-2">
            {['all', 'open', 'in-progress', 'closed'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`
                  px-4 py-2 rounded-full font-medium transition border
                  ${filter === s
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}
                `}
              >
                {s.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

  
        <div className="space-y-4">
          {list.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
              </svg>
              <p className="text-slate-600 text-lg">No tickets found</p>
            </div>
          ) : (
            list.map(t => <Card key={t.id} ticket={t} />)
          )}
        </div>
      </div>

    </div>
  )
}

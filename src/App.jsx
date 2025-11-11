import React, { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import Detail from './pages/Detail.jsx'
import { defaultTickets } from './utils/mockData.js'
import Edit from './components/Edit.jsx'

const TicketContext = createContext()
export const useTickets = () => useContext(TicketContext)

function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('tickets')
    if (stored) {
      setTickets(JSON.parse(stored))
    } else {
      setTickets(defaultTickets)
      localStorage.setItem('tickets', JSON.stringify(defaultTickets))
    }
  }, [])

  const save = useCallback((arr) => {
    setTickets(arr)
    localStorage.setItem('tickets', JSON.stringify(arr))
  }, [])

  const addTicket = useCallback((ticket) => {
    const newTicket = {
      ...ticket,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    save([...(tickets || []), newTicket])
    return newTicket.id
  }, [tickets, save])

  const updateTicket = useCallback((id, updates) => {
    const updated = tickets.map(t =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    )
    save(updated)
  }, [tickets, save])

  const deleteTicket = useCallback((id) => {
    save(tickets.filter(t => t.id !== id))
  }, [tickets, save])

  const value = { tickets, addTicket, updateTicket, deleteTicket }
  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export default function App() {
  return (
    <TicketProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Nav />
        <main className="container flex-1 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/ticket/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </main>
      </div>
    </TicketProvider>
  )
}

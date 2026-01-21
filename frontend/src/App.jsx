import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [libri, setLibri] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

  useEffect(() => {
    async function fetchLibri() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/libri`)
        if (!res.ok) throw new Error('Errore nel recupero dei libri')
        const data = await res.json()
        setLibri(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLibri()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Confermi eliminazione del libro?')) return
    try {
      const res = await fetch(`${API_BASE}/api/libri/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Errore eliminazione')
      setLibri((prev) => prev.filter((b) => b.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleDeleteAll() {
    if (!confirm('Confermi eliminazione di tutti i libri?')) return
    try {
      const res = await fetch(`${API_BASE}/api/libri`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Errore eliminazione tutti')
      setLibri([])
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Gestione Libreria</h1>

      {loading && <p>Caricamento libri...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <button onClick={handleDeleteAll}>Cancella intera libreria</button>
          </div>

          <ul>
            {libri.map((libro) => (
              <li key={libro.id} style={{ marginBottom: 8 }}>
                <strong>{libro.titolo}</strong> — {libro.autore} ({libro.anno}) • {libro.genere}
                <button style={{ marginLeft: 8 }} onClick={() => handleDelete(libro.id)}>Elimina</button>
              </li>
            ))}
          </ul>

          {libri.length === 0 && <p>Nessun libro disponibile.</p>}
        </div>
      )}

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App

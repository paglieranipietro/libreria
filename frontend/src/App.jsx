import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [libri, setLibri] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Search states
  const [searchAutore, setSearchAutore] = useState('')
  const [searchGenere, setSearchGenere] = useState('')

  // New book state
  const [newBook, setNewBook] = useState({
    titolo: '',
    autore: '',
    anno: '',
    genere: ''
  })

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

  useEffect(() => {
    fetchLibri()
  }, [])

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

  async function handleCreate(e) {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/api/libri`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      })
      if (!res.ok) throw new Error('Errore nella creazione')
      const created = await res.json()
      setLibri(prev => [...prev, created])
      setNewBook({ titolo: '', autore: '', anno: new Date().getFullYear(), genere: '' })
    } catch (e) {
      alert(e.message)
    }
  }

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

  // Filter logic
  const filteredLibri = libri.filter(b => {
    const matchAutore = b.autore.toLowerCase().includes(searchAutore.toLowerCase())
    const matchGenere = b.genere.toLowerCase().includes(searchGenere.toLowerCase())
    return matchAutore && matchGenere
  })

  return (
    <div className="app-container">
      {/* Header Fissato */}
      <h1 className="main-title">Gestione Libreria di Paglierani</h1>

      <div className="main-layout">

        {/* LEFT PANEL: Functions (Fixed/Independently Scrollable if needed) */}
        <div className="left-panel">

          {/* Add Book Form */}
          <section className="control-section">
            <h2>Nuovo Libro</h2>
            <form onSubmit={handleCreate} className="form-group">
              <input
                placeholder="Titolo"
                value={newBook.titolo}
                onChange={e => setNewBook({ ...newBook, titolo: e.target.value })}
                required
              />
              <input
                placeholder="Autore"
                value={newBook.autore}
                onChange={e => setNewBook({ ...newBook, autore: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Anno"
                value={newBook.anno}
                onChange={e => setNewBook({ ...newBook, anno: parseInt(e.target.value) })}
                required
              />
              <input
                placeholder="Genere"
                value={newBook.genere}
                onChange={e => setNewBook({ ...newBook, genere: e.target.value })}
                required
              />
              <button type="submit">Aggiungi Libro</button>
            </form>
          </section>

          {/* Global Actions */}
          {libri.length > 0 && (
            <section className="control-section">
              <button onClick={handleDeleteAll} className="delete-all-btn">
                Elimina Tutti i Libri
              </button>
            </section>
          )}
        </div>

        {/* RIGHT PANEL: Search + List (Independently Scrollable) */}
        <div className="right-panel">

          {/* Search Bar - Fixed at top of list view */}
          <div className="search-bar-container">
            <input
              placeholder="Cerca per Autore..."
              value={searchAutore}
              onChange={e => setSearchAutore(e.target.value)}
            />
            <input
              placeholder="Cerca per Genere..."
              value={searchGenere}
              onChange={e => setSearchGenere(e.target.value)}
            />
          </div>

          <div className="list-header">
            <h2>Elenco Libri ({filteredLibri.length})</h2>
          </div>

          <div className="scrollable-list">
            {loading && <p>Caricamento...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
              <>
                {filteredLibri.length === 0 ? (
                  <p>Nessun libro trovato.</p>
                ) : (
                  <ul className="book-list">
                    {filteredLibri.map((libro) => (
                      <li key={libro.id} className="book-item">
                        <div className="book-info">
                          <h3>{libro.titolo}</h3>
                          <div className="book-details">
                            {libro.autore} • {libro.anno} • {libro.genere}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(libro.id)}
                          className="delete-btn"
                        >
                          Elimina
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

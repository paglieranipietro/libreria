# Web Application per Gestione Libreria

Un'applicazione web client-server per la gestione di una libreria, sviluppata con React (frontend) e Flask (backend).

## 📋 Indice

- [Panoramica](#panoramica)
- [Architettura](#architettura)
- [Requisiti Funzionali](#requisiti-funzionali)
- [Requisiti Non Funzionali](#requisiti-non-funzionali)
- [User Stories](#user-stories)
- [Installazione e Configurazione](#installazione-e-configurazione)
- [API Documentation](#api-documentation)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)

## 🔍 Panoramica

L'obiettivo dell'applicazione è comprendere la distinzione tra frontend e backend e il funzionamento delle API REST per lo scambio dei dati. Il sistema gestisce una libreria con operazioni CRUD sui libri e funzionalità di ricerca lato client.

## 🏗️ Architettura

Il progetto è strutturato come un'applicazione client-server:

- **Frontend**: React + Vite per l'interfaccia utente
- **Backend**: Python Flask con API RESTful
- **Dati**: Generazione automatica di libri tramite libreria Faker

## ⚙️ Requisiti Funzionali

### RF-001: Gestione Catalogo Libri
- Il sistema deve generare automaticamente circa 20 libri all'avvio tramite Faker
- Ogni libro deve contenere: id, titolo, autore, anno, genere
- Deve permettere l'inserimento di nuovi libri (ID generato dal server)
- Deve permettere l'eliminazione di singoli libri
- Deve permettere l'eliminazione di tutti i libri

### RF-002: Visualizzazione Libri
- Il frontend deve caricare e visualizzare l'elenco completo dei libri all'avvio
- Utilizzo di useEffect per il caricamento iniziale dei dati
- Interfaccia per mostrare tutti i campi del libro

### RF-003: Inserimento Libri
- Form controllato per l'inserimento di nuovi libri
- Validazione lato client dei campi obbligatori
- Invio dati tramite API POST al backend

### RF-004: Eliminazione Libri
- Possibilità di eliminare un singolo libro tramite pulsante/azione
- Possibilità di cancellare l'intera libreria
- Conferma prima dell'eliminazione per evitare azioni accidentali

### RF-005: Ricerca e Filtri
- Filtro di ricerca per autore (eseguito lato client)
- Filtro di ricerca per genere (eseguito lato client)
- Ricerca in tempo reale mentre l'utente digita

## 🛡️ Requisiti Non Funzionali

### RNF-001: Performance
- Caricamento rapido dell'elenco libri all'avvio
- Filtri di ricerca reattivi e fluidi
- Interfaccia responsive

### RNF-002: Usabilità
- Interfaccia intuitiva e user-friendly
- Form controllati con feedback visuale
- Messaggi di conferma per azioni di eliminazione

### RNF-003: Architettura
- Separazione netta tra frontend e backend
- Comunicazione tramite API REST
- Struttura modulare del codice

### RNF-004: Compatibilità
- Compatibilità cross-browser
- Responsive design per diversi dispositivi

### RNF-005: Manutenibilità
- Codice pulito e ben strutturato
- Utilizzo di best practices React e Flask
- Versionamento tramite GitHub

## 👤 User Stories

### Epica: Visualizzazione e Caricamento Dati

**US-001: Caricamento Libri all'Avvio**
- **Come** utente dell'applicazione
- **Voglio** che i libri vengano caricati automaticamente all'apertura dell'app
- **Così che** possa vedere immediatamente l'elenco completo dei libri disponibili
- **Criteri di Accettazione:**
  - [ ] Utilizzo di useEffect per il caricamento iniziale
  - [ ] Chiamata GET /api/libri all'avvio del componente
  - [ ] Visualizzazione di tutti i campi del libro (id, titolo, autore, anno, genere)
  - [ ] Loading state durante il caricamento

**US-002: Visualizzazione Elenco Libri**
- **Come** utente
- **Voglio** poter visualizzare l'elenco completo dei libri
- **Così che** possa navigare tra tutti i libri disponibili
- **Criteri di Accettazione:**
  - [ ] Lista di tutti i libri con tutti i dettagli
  - [ ] Layout chiaro e leggibile
  - [ ] Visualizzazione di circa 20 libri generati automaticamente

### Epica: Gestione Libri

**US-003: Aggiunta Nuovo Libro**
- **Come** utente
- **Voglio** poter aggiungere un nuovo libro alla libreria
- **Così che** possa espandere la collezione
- **Criteri di Accettazione:**
  - [ ] Form controllato con campi: titolo, autore, anno, genere
  - [ ] Validazione lato client dei campi obbligatori
  - [ ] Chiamata POST /api/libri per salvare il libro
  - [ ] ID generato automaticamente dal server
  - [ ] Aggiornamento della lista dopo l'inserimento

**US-004: Eliminazione Singolo Libro**
- **Come** utente
- **Voglio** poter eliminare un libro specifico
- **Così che** possa rimuovere libri non più desiderati
- **Criteri di Accettazione:**
  - [ ] Pulsante "Elimina" per ogni libro nella lista
  - [ ] Messaggio di conferma prima dell'eliminazione
  - [ ] Chiamata DELETE /api/libri/{id}
  - [ ] Rimozione immediata dalla visualizzazione

**US-005: Cancellazione Completa Libreria**
- **Come** utente
- **Voglio** poter cancellare tutti i libri
- **Così che** possa resettare completamente la libreria
- **Criteri di Accettazione:**
  - [ ] Pulsante "Cancella Tutto" nell'interfaccia
  - [ ] Conferma multipla per azione irreversibile
  - [ ] Chiamata DELETE /api/libri
  - [ ] Svuotamento completo della lista visualizzata

### Epica: Ricerca e Filtri

**US-006: Ricerca per Autore**
- **Come** utente
- **Voglio** poter filtrare i libri per autore
- **Così che** possa trovare facilmente libri di autori specifici
- **Criteri di Accettazione:**
  - [ ] Campo di ricerca per autore
  - [ ] Filtro eseguito lato client in tempo reale
  - [ ] Ricerca case-insensitive
  - [ ] Aggiornamento immediato della lista durante la digitazione

**US-007: Ricerca per Genere**
- **Come** utente
- **Voglio** poter filtrare i libri per genere
- **Così che** possa esplorare libri di generi specifici
- **Criteri di Accettazione:**
  - [ ] Campo di ricerca/filtro per genere
  - [ ] Filtro eseguito lato client
  - [ ] Possibilità di combinare con filtro autore
  - [ ] Visualizzazione risultati filtrati in tempo reale

### Epica: Backend e API

**US-008: Generazione Dati Iniziali**
- **Come** sviluppatore
- **Voglio** che il server generi automaticamente dati di test
- **Così che** l'applicazione abbia contenuti iniziali
- **Criteri di Accettazione:**
  - [ ] Utilizzo della libreria Faker per generare circa 20 libri
  - [ ] Generazione all'avvio del server Flask
  - [ ] Dati realistici per tutti i campi richiesti
  - [ ] Varietà nei generi e autori generati

**US-009: API REST Complete**
- **Come** frontend developer
- **Voglio** avere accesso a tutte le API necessarie
- **Così che** possa implementare tutte le funzionalità richieste
- **Criteri di Accettazione:**
  - [ ] GET /api/libri - restituisce elenco completo
  - [ ] POST /api/libri - aggiunge nuovo libro
  - [ ] DELETE /api/libri/{id} - elimina libro specifico  
  - [ ] DELETE /api/libri - elimina tutti i libri
  - [ ] Risposte JSON appropriate per ogni endpoint

## 🚀 Installazione e Configurazione

### Prerequisiti
- Node.js >= 16.0.0
- Python >= 3.8
- npm o yarn
- Flask
- Faker (per generazione dati)

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Flask)
```bash
cd backend
pip install flask faker
python main.py
```

## 📚 API Documentation

### Endpoints REST

#### GET /api/libri
- **Descrizione**: Restituisce l'elenco completo dei libri
- **Metodo**: GET
- **Response**: Array di oggetti libro
- **Esempio Response**:
```json
[
  {
    "id": 1,
    "titolo": "Il Nome della Rosa",
    "autore": "Umberto Eco", 
    "anno": 1980,
    "genere": "Romanzo storico"
  }
]
```

#### POST /api/libri
- **Descrizione**: Aggiunge un nuovo libro (ID generato dal server)
- **Metodo**: POST
- **Body**: Oggetto libro senza ID
- **Esempio Request**:
```json
{
  "titolo": "Nuovo Libro",
  "autore": "Autore Nome",
  "anno": 2024,
  "genere": "Fantasy"
}
```

#### DELETE /api/libri/{id}
- **Descrizione**: Elimina il libro con l'ID specificato
- **Metodo**: DELETE
- **Parametri**: id (integer) - ID del libro da eliminare

#### DELETE /api/libri
- **Descrizione**: Elimina tutti i libri presenti
- **Metodo**: DELETE

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React 19.2.0** - Libreria UI
- **Vite** - Build tool e dev server
- **useEffect** - Hook per caricamento dati
- **useState** - Hook per gestione stato
- **Form controllati** - Gestione input utente

### Backend
- **Python 3.8+** - Linguaggio di programmazione
- **Flask** - Web framework
- **Faker** - Generazione dati di test
- **API REST** - Architettura comunicazione

### Struttura Dati
```javascript
// Modello Libro
{
  id: number,          // Generato automaticamente
  titolo: string,      // Titolo del libro
  autore: string,      // Nome autore
  anno: number,        // Anno di pubblicazione
  genere: string       // Genere letterario
}
```

---

## 📝 Note di Sviluppo

### Funzionalità Implementate
- ✅ Generazione automatica ~20 libri con Faker
- ✅ API REST complete (GET, POST, DELETE)
- ✅ Frontend React con useEffect per caricamento
- ✅ Form controllato per inserimento libri
- ✅ Eliminazione singola e multipla
- ✅ Filtri di ricerca lato client (autore, genere)

### Best Practices
- Separazione frontend/backend
- Form controllati React
- Gestione stato con useState
- API REST standardizzate
- Filtri lato client per performance

## 📄 Consegna

- **Versionamento**: GitHub
- **Repository**: Codice completo frontend + backend
- **Documentazione**: README con istruzioni setup
- **Demo**: Applicazione funzionante

## 🎯 Obiettivi Didattici

- ✅ Comprensione distinzione frontend/backend
- ✅ Utilizzo API REST per scambio dati
- ✅ Gestione stato React con Hooks
- ✅ Form controllati e validazione
- ✅ Comunicazione client-server

import React from 'react'
import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/note'
import './index.css'

const App = () => {
  const [notes, setNote] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(()=>{
    noteService.getAll()
    .then(initalNotes=>{
      setNote(initalNotes)
    })
  },[])

  const toggleImportance = id =>{
    const note = notes.find(n => n.id ===id)
    const changedNote = {...note, important: !note.important }
    noteService.update(id, changedNote)
    .then(returnNote=>{
      setNote(notes.map(note => note.id !== id ? note : returnNote))
    })
  }


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    noteService.create(noteObject)
    .then(returnNote=>{
      setNote(notes.concat(returnNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id}
           note={note}
           toggleImportance={()=>toggleImportance(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default App
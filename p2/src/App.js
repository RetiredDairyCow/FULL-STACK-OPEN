import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteServices from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  
  const notesToShow = showAll ? notes : notes.filter( note => note.important === true)
  
  const hook = () => {
    noteServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  
  const addNote = (event) => {
    /*When we create a new Note Obj we let the backend server add the id*/
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteServices
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
    /* axios
      .post('http://localhost:3001/noteshttp://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      }) */
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOfFunc = (id) => {
    const handler = () => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important : !note.important}
    
    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from the server`)
        setNotes(notes.filter(n => n.id !== id))
      })
    }
    return handler
  }

    return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
       {notesToShow.map(note => 
       <Note key={note.id} note={note} toggleImportance={toggleImportanceOfFunc(note.id)} />
       )}{/*  or use () => toggleImportanceOf(note.id)  */}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
      <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
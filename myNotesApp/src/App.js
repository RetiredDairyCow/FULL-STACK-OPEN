import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Error'
import noteServices from './services/notes'
import './index.css'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br/>
      <em>Note app, Dept of CSC</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
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
        setErrorMessage(`Note '${note.content}' was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)

        }, 4000)
        setNotes(notes.filter(n => n.id !== id))
      })
    }
    return handler
  }

    return (
    <div>
      <h1>Notes</h1>
      
      <Notification message={errorMessage}/>
      
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
      <button className="submitButton" type="submit">Save</button>
      </form>
      
      <Footer/>
    </div>
  )
}

export default App
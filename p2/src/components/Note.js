import React from 'react'

const notesStyle ={
    color: 'orange',
    fontStyle: 'italic',
    fontSize: 17
}

const Note = ({note, toggleImportance}) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
    <li class ="note" style={notesStyle}>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
    </li>
    )
}

export default Note
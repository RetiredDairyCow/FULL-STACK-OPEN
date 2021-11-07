import React from 'react'
import personServices from '../services/persons'



const Numbers = (props) => {
    const handleDelete = (event) => {
        if(window.confirm(`Delete ${props.firstAndLast}?`))
        {
            personServices
                .deleteEntry(props.entryID)
                .then( response => {
                    props.setPersons(props.persons.filter(p => p.id !== props.entryID))
                })
                .catch(error => {
                    window.alert('The entry has already been deleted')
                    props.setPersons(props.persons.filter(p => p.id !== props.entryID))
                })
        }
    }
    
    return (
        <li>
        {props.firstAndLast} {props.no} {' '}
        <button onClick={handleDelete}>Delete Entry</button>
        </li>
    )
}

export default Numbers
import React from 'react'
import personServices from '../services/persons'
/* import axios from 'axios' */

const Forms = (props) => {
    const handleNameChange = (event) => {
        console.log(event.target.value)
        props.setNewName(event.target.value)
      }
    
    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value)
      }

    const addNameAndNumber = (event) => {
        /* Add name and number to the list of notes */
  
        event.preventDefault() //prevents refreshing page on submit
        const checkNameinArray = props.persons.some(nameElement => 
            nameElement.name === props.newName)
        
        if (checkNameinArray === true)
        {
          if(window.confirm(`${props.newName} is already in the phonebook,
          replace old number with a new one?`))
          {
            const findPersonObj = props.persons.find(p => p.name === props.newName)
            const newPersonObj = {...findPersonObj, number : props.newNumber}

            personServices
              .update(findPersonObj.id, newPersonObj)
              .then(responseObj => {
                props.setPersons(props.persons.map(p => p.id !== newPersonObj.id ? p : responseObj ))
              })
            
          }
        }
        else {
            const newNameObject = {
            name: props.newName,
            number: props.newNumber
            }
            personServices
              .create(newNameObject)
              .then(returnedPerson => {
                props.setPersons(props.persons.concat(returnedPerson))
              })
        }
    }
      
    return (
        <form onSubmit={addNameAndNumber}>
        <div>
          Name: <input value={props.newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={props.newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default Forms
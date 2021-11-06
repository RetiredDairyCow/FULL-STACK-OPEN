import React from 'react'
import axios from 'axios'
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
            window.alert(props.newName +  " already exists!")
        else {
            const newNameObject = {
            name: props.newName,
            number: props.newNumber
            }
            axios
              .post('http://localhost:3001/persons', newNameObject)
              .then(response => {
                props.setPersons(props.persons.concat(response.data))
              })
            /* props.setPersons(props.persons.concat(newNameObject)) */
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
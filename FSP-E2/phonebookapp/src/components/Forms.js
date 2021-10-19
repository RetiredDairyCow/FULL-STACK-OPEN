import React from 'react'

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
  
        event.preventDefault()
        const checkNameinArray = props.persons.some(nameElement => 
            nameElement.name === props.newName)
        
        if (checkNameinArray === true)
            window.alert(props.newName +  " already exists!")
        else {
            const newNameObject = {
            name: props.newName,
            number: props.newNumber
            }
            props.setPersons(props.persons.concat(newNameObject))
            /* props.setNewName('Add a new name')
            props.setNewNumber('Add a new number') */
        }
    }
      
    return (
        <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={props.newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Forms
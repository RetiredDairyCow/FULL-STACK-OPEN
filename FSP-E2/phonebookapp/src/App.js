import React, {useState} from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Ashesh Patel'},
    {name: 'Olivia Virtue'}
  ])
  const [newName, setNewName] = useState('')

  const doesIt = persons.some(el => el.name === 'Olivia Virtue')
  console.log(doesIt)

  const addName = (event) => {
    event.preventDefault()
    const checkNameinArray = persons.some(nameElement => 
      nameElement.name === newName)
    if (checkNameinArray === true)
      window.alert(newName +  " already exists!")
    else {
      const newNameObject = {
        name: newName
      }
      setPersons(persons.concat(newNameObject))
      setNewName('Add a new name')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Numbers key={person.name} firstAndLast = {person.name}/> 
        )}
    </div>
  )


}

export default App
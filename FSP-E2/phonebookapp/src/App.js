import React, {useState} from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Ashesh Patel', number: 7604645565},
    {name: 'Olivia Virtue', number: 7604643579},
    {name: 'Kev Bhardawaj', number: 7601234545}
  ])
  const [newName, setNewName] = useState('Enter Name')
  const [newNumber, setNewNumber] = useState('Enter New Number')
  const [searchTerm, setSearch] = useState('')


  const addNameAndNumber = (event) => {
    event.preventDefault()
    const checkNameinArray = persons.some(nameElement => 
      nameElement.name === newName)
    if (checkNameinArray === true)
      window.alert(newName +  " already exists!")
    else {
      const newNameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newNameObject))
      setNewName('Add a new name')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const nameFilter = searchTerm.length === 0 ? persons : 
    persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  

  /* const nameFilter = searchTerm ? persons : 
    persons.filter( person => person.name.toUpperCase().includes(searchTerm.toUpperCase)) */

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search Name: <input value={searchTerm} onChange={handleSearch}/>
      </div>
     <h2>Add New Data Please</h2>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {nameFilter.map(person =>
        <Numbers key={person.name} firstAndLast = {person.name} 
        no={person.number}/> 
      
        )}
    </div>
  )


}

export default App
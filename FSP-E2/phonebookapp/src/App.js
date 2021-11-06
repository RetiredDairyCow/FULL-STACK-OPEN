/* Phone book app with effect hooks and data from JSON serve */
import React, {useState, useEffect} from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import Forms from './components/Forms'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter Name')
  const [newNumber, setNewNumber] = useState('Enter New Number')
  const [searchTerm, setSearch] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook,[])

  const nameFilter = searchTerm.length === 0 ? persons : 
    persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  return (
    <div>
      
      <h2>Phonebook</h2>
      {<Search searchTerm={searchTerm} setSearch={setSearch}/>}
     
      <h2>Add New Data Please</h2>
      {<Forms newName={newName} newNumber={newNumber} 
      setNewName={setNewName} setNewNumber={setNewNumber}
      persons={persons} setPersons={setPersons}/>}

      <h2>Numbers</h2>
      {nameFilter.map(person =>
        <Numbers key={person.name} firstAndLast = {person.name} 
        no={person.number}/>)}
    
    </div>
  )


}

export default App
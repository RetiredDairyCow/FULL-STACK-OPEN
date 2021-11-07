/* Phone book app with effect hooks and data from JSON serve */
import React, {useState, useEffect} from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import Forms from './components/Forms'
import personServices from './services/persons'


const App = () => {
 /*  const url = 'http://localhost:3001/persons' */
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter Name')
  const [newNumber, setNewNumber] = useState('Enter New Number')
  const [searchTerm, setSearch] = useState('')

  const hook = () => {
    personServices
      .getAll()
      .then(initialList =>{
        setPersons(initialList)
      })
    /* axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      }) */
  }
  useEffect(hook,[])

  const nameFilter = searchTerm.length === 0 ? persons : 
    persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  return (
    <div>
      
      <h2>Phonebook</h2>
      {<Search searchTerm={searchTerm} setSearch={setSearch}/>}
     
      <h2>Add New Entry Please</h2>
      {<Forms newName={newName} newNumber={newNumber} 
      setNewName={setNewName} setNewNumber={setNewNumber}
      persons={persons} setPersons={setPersons}/>}

      <h2>Numbers</h2>
      {nameFilter.map(person =>
        <Numbers key={person.id} firstAndLast = {person.name} entryID={person.id}
        no={person.number} persons={persons} setPersons={setPersons}/>)}
    
    </div>
  )


}

export default App
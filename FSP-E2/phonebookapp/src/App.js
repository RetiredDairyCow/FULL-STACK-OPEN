import React, {useState} from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import Forms from './components/Forms'

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Ashesh Patel', number: 7604645565},
    {name: 'Olivia Virtue', number: 7604643579},
    {name: 'Kev Bhardawaj', number: 7601234545},
    {name: 'Dimple Agarwal', number: 7609854886}
  ])
  const [newName, setNewName] = useState('Enter Name')
  const [newNumber, setNewNumber] = useState('Enter New Number')
  const [searchTerm, setSearch] = useState('')

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
        no={person.number}/> 
      
        )}
    </div>
  )


}

export default App
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import Filter from './components/Filter'

const App = () => {
 
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearch] = useState('')

  const url = 'https://restcountries.com/v3.1/all'

  const hook = () => {
   /*  console.log('Hook') */
    axios
    .get(url)
    .then(response => {
      /* console.log('Promises fullfilled') */
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const searchFilter = searchTerm.length === 0 ? countries :
    countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <p>Find Countries:</p>
      <Search searchTerm={searchTerm} setSearch={setSearch}/>
      <h3>Showing Countries:</h3>
      <Filter  countries={searchFilter} searchTerm={searchTerm}/>
    </div>
  )


}

export default App
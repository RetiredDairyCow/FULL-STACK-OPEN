import React from 'react'

const Search = (props) => { 
    //event handler to set search term
    const handleSearch = (event) => {
        props.setSearch(event.target.value)
    }
    
    return (
        
        <div>
            Search Name: <input value={props.searchTerm} onChange={handleSearch}/>
        </div>
    )
}
export default Search
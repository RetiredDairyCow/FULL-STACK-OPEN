import React, { useState } from 'react'



const Country = (props) => {
    const [showDetails, setShow] = useState(false)

    const handleShow = () => {
        setShow(!showDetails)
    }
    //lists different countries when the search results in less than 10 countries
    return (
        <li>{props.country + ' '}
        <button onClick={handleShow}>{showDetails ? 'Hide' : 'Show'}</button>
        {showDetails && <CountryDetails country={props.countryObj}/>}
        </li>
    )
}

const CountryDetails = (props) => {
    //When only one country -> show details. 
    //To-Do: Add weather API 
    const lang = []
    for (const lanCode of Object.keys(props.country.languages)){
        lang.push(props.country.languages[lanCode])
    }
    return (
        <div>
            <h2>{props.country.name.common}</h2>
            <p>Capital: {props.country.capital}</p>
            <p>Area:{props.country.area}</p>
            <p>Languages:</p>
            {lang.map((e,index) => <li key={index}>{e}</li>)}
            <img src={props.country.flags['png']} width="200px" alt="flag"/>
        </div>
    )
}
const Filter = (props) => {
    let resultingCountries = "Please add a filter"
    if(props.searchTerm.length > 0)
    {
        if(props.countries.length === 1){
            resultingCountries = <CountryDetails country={props.countries[0]}/>
        }
        else if (props.countries.length > 10){
            resultingCountries = "There are too many matches, please specify another filter"
        }
        else if (props.countries.length <= 10){
            resultingCountries = props.countries.map((e,i) => {
                return <Country key={e.name.common} country={e.name.common}
                    countryObj={e}/>
            })
        }
    
    }
    return (
        <div>{resultingCountries}</div>
    )
}

export default Filter
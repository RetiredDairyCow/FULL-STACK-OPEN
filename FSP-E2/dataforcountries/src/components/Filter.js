import React from 'react'

const Country = (props) => {
    return (
        <li>{props.country}</li>
    )
}

const CountryDetails = (props) => {
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
        else if (props.countries.length <=10){
            resultingCountries = props.countries.map(e => {
                return <Country key={e.name.common} country={e.name.common}/>
            })
        }
    
    }
    return (
        <div>{resultingCountries}</div>
    )
}

export default Filter
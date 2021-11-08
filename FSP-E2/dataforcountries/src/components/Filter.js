import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Country = (props) => {
    const [showDetails, setShow] = useState(false)

    const handleShow = () => {
        setShow(!showDetails)
    }
    
    return (
        <div>{props.country}
        <button onClick={handleShow}>{showDetails ? 'Hide' : 'Show'}</button>
        {showDetails && <CountryDetails country={props.countryObj}/>}
        </div>
    )
}

const Weather = (props) => {
    return (
        <>
        <div>Currently it is {props.temp} Celcius</div>
        <img src={props.weatherImage} alt="IMG"></img>
        <div><b>Wind: </b>{props.windSpeed} kmph direction {props.windDirection}</div>
        </>
    )
}

const CountryDetails = (props) => {
    //When only one country -> show details. 
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`
    const lang = []
    
    const [weather, setWeather] = useState({
        temp : undefined,
        windSpeed : undefined,
        windDirection : undefined,
        weatherImage : undefined
    })
  
    const weatherHook = () => {
       axios
        .get(url)
        .then(response => {
            const updateWeather = {
                temp : response.data['current']['temperature'],
                windSpeed : response.data['current']['wind_speed'],
                windDirection : response.data['current']['wind_dir'],
                weatherImage : response.data['current']['weather_icons']
                
            }
            setWeather(updateWeather)
          
        })
    }
    useEffect(weatherHook,[url])
    
    
    for (const lanCode of Object.keys(props.country.languages)){
        lang.push(props.country.languages[lanCode])
    }
    return (
        <div>
            <h3>{props.country.name.common}</h3>
            <div>Capital: {props.country.capital}</div>
            <div>Area:{props.country.area}</div>
            <h3>Languages:</h3>
            {lang.map((e,index) => <li key={index}>{e}</li>)}
            <img src={props.country.flags['png']} width="200px" alt="flag"/>
            <h3>Weather in {props.country.capital}</h3>
            {<Weather temp={weather.temp} windSpeed={weather.windSpeed} weatherImage={weather.weatherImage}
                windDirection={weather.windDirection}/>}
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
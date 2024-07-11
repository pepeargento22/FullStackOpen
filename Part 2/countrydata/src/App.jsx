import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryProfile from './components/CountryProfile'

function App() {
  const [countryList, setCountryList] = useState(null)
  const [countrySearch, setCountrySearch] = useState([''])
  const [countryData, setCountryData] = useState({
    name: '', 
    capital: '' , 
    area: '', 
    languages: [], 
    flag: [],
    weather: {
      temp: '',
      wind: '',
      icon: ''
    }
  })

  useEffect(() => {
    if (!countryList) {
    console.log('fetching....')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const newCountryList = []
        response.data.forEach(country => {
          newCountryList.push(country.name.common)
        });
        setCountryList(newCountryList)      
      })
      return
    }

    if (filteredCountries.length === 1) {
      console.log('starting api request 1...')
      const api_key = import.meta.env.VITE_SOME_KEY
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries}`)
        .then(response => {
          const country = response.data
          const newCountryData = { 
            name: country.name.common, 
            capital: country.capital[0], 
            area: country.area, 
            languages: Object.entries(country.languages), 
            flag: country.flags.png,
          }
          const capitalLatLng = { 
            latitude: country.capitalInfo.latlng[0], 
            longitude: country.capitalInfo.latlng[1] 
          }
          console.log('finished api request 1...')
          axios  
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLatLng.latitude}&lon=${capitalLatLng.longitude}&units=metric&appid=${api_key}`)
            .then(response => {
              console.log('started api request 2... ')
              const data = response.data
              const newWeatherData = {
                weather: {
                  temp: data.main.temp,
                  wind: data.wind.speed,
                  icon: data.weather[0].icon
                }
              }
              setCountryData({...newCountryData, ...newWeatherData})
              console.log('finished api request 2...')
            })
        })
    }
  },[countrySearch])

  const checkSearch = (country) => {
    return country.toLowerCase().includes(countrySearch)
  }
  const filteredCountries = countryList?.filter(checkSearch)

  const handleChange = (e) => {
    console.log('typing....')
    setCountrySearch(e.target.value.toLowerCase())
  }

  if (!countryList || filteredCountries.length === 250) {
    return (
        <div>
          <span>find countries</span>
          <input value={countrySearch} onChange={handleChange} />
        </div>
    )
  }

  return (
    <>
      <div>
        <span>find countries</span>
        <input value={countrySearch} onChange={handleChange} />
      </div>
      <div>
        {
          filteredCountries.length > 10 
            ? <p>Too many matches, specify another filter</p>
            : filteredCountries.length === 1 
              ? <CountryProfile 
                  name={ countryData.name }
                  capital={ countryData.capital }
                  area={ countryData.area }
                  languages={ countryData.languages }
                  flag={ countryData.flag }
                  temperature={ countryData.weather.temp }
                  windSpeed={ countryData.weather.wind }
                  weatherIcon= {countryData.weather.icon }
                />
              : filteredCountries.map( country => (
                <div key={country}>
                  {country} <button onClick={() => setCountrySearch(country.toLowerCase())}>Show</button>
                </div>
              ))
        }
      </div>
    </>
  )
}

export default App

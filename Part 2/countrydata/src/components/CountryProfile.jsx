const CountryProfile = ({ name, capital, area, languages, flag, temperature, windSpeed, weatherIcon }) => {
    console.log(name + ' - ' + capital + ' - ' + area + ' - ' + languages + ' - ' + flag + ' - ' + temperature + ' - ' + windSpeed + ' - ' + weatherIcon)
    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <strong>languages:</strong>
            <ul>
                {
                    languages?.map(language => (
                        <li key={language[0]}>{language[1]}</li>
                    ))
                }
            </ul>
            <img src={flag} alt={`${name} flag`} />
            <h2>Weather in {capital}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" />
            <p>wind {windSpeed} m/s</p>
        </div>
    )
}

export default CountryProfile
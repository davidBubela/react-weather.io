import React, {useState} from 'react'
import axios from 'axios';


function App() {
  
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  // API Key: e08e4cbe060d4fd690aaa6ca973ffbaf
  // API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e08e4cbe060d4fd690aaa6ca973ffbaf`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data)
    })
    setLocation('')
    }
    
  }

  return (
    // swapped app for styling purposes
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      <div className="container">

        <div className="top">
          
          <div className="location">
            <p>{data.name}</p>
          </div>
          
          <div className="temp">
            {/* <h1>{data.main.temp}°F</h1> */}
            {/* temp is child element of main. Throws error "unable to be found" 
            check to see if data.main is available and then check temp on success */}
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

        </div>
        

        {/* Used to keep bottom from rendering without search */}
        {data.name !== undefined && 
        
          <div className="bottom">
          
          <div className="feels">
            <p className='bold'>Feels Like</p>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °F</p> : null}
          </div>
          
          <div className="humidity">
            <p className='bold'>Humidity</p>
            {data.main ? <p className='bold'>{data.main.humidity.toFixed()} %</p> : null}
          </div>

          <div className="wind">
            <p className='bold'>Windspeed</p>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
          </div>

        </div>
        }
        

      </div>

    </div>
  );
}

export default App;

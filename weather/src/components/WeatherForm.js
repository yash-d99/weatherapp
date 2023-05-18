import React, { useEffect, useState} from 'react'
import WeatherResult from './WeatherResult'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function WeatherForm() {
    const [cityName, setCityName] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [finalCity, setFinalCity] = useState(null);
    const [finalState, setFinalState] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const setCoordinates = (dataB) => {
        setLat(dataB[0].lat);
        setLon(dataB[0].lon);
    } 
    useEffect( ()=> {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${finalCity},${finalState}&limit=1&appid=${API_KEY}`)
        .then((result) => result.json())
        .then((data) => setCoordinates(data))
        .catch((error) => console.log(error));
        //console.log(lat);
        //console.log(lon);
    },[finalCity, finalState, API_KEY, lat, lon]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(cityName);
        // console.log(stateCode);
        setFinalCity(cityName);
        setFinalState(state);
        
        
      };
    return (
        <>
        <form onSubmit = {handleSubmit}>
            <div>
                <TextField id="outlined-basic" label="City" variant="outlined" name = 'city' value = {cityName} onChange={e => setCityName(e.target.value)}/>
                {/* <label>
                    City Name <input type = 'text' name = 'city' value = {cityName} onChange={e => setCityName(e.target.value)}/>
                </label> */}
            </div>
            <div>
            <TextField id="outlined-basic" label="State" variant="outlined" name = 'state' value = {state} onChange={e => setState(e.target.value)}/>
                {/* <label>
                    State <input type = 'text' name = 'state' value = {state} onChange={e => setState(e.target.value)}/>
                </label> */}
            </div>
            <div>
                {/* <label></label> */}
                <Button type="submit" variant = "contained">Submit</Button>
             </div>
        </form>
        <WeatherResult lat = {lat} lon = {lon}/>
        </>
    );
}
export default WeatherForm;
import { useEffect, useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
function Daily(props) {
    const day = props.day;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [dayHighTemp, setDayHighTemp] = useState('');
    const [dayLowTemp, setDayLowTemp] = useState('');
    const [weatherCode, setWeatherCode] = useState('');
    const updateWeather = (data) => {
        setDayHighTemp((Math.round((data.daily[day].temp.max - 273.15) * (9/5) + 32)));
        setDayLowTemp((Math.round((data.daily[day].temp.min - 273.15) * (9/5) + 32)));
        setWeatherCode(data.daily[day].weather[0].icon);
    }
    useEffect( ()=> {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=$imperial&appid=${API_KEY}`)
        .then((result) => result.json())
        .then((data) => updateWeather(data))
        .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, [API_KEY, props.lat, props.lon]);
    return (
        <Grid
      sx={{
        width: 300,
        height: 100,
        //backgroundColor: 'primary.dark',
       
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      >
        <List
        sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
        }}
        >
        <ListItem>
            <ListItemText primary= {"Temperature in " + (day+1) + " days"} secondary = {"High: " + dayHighTemp + "°F | Low: " + dayLowTemp}  />
            <img src = {`https://openweathermap.org/img/wn/${weatherCode}@2x.png`} alt = 'weather icon'/>
        </ListItem>
        <Divider component="li" />
        {/* <ListItem>
            <ListItemText primary="Weather" secondary = {curMainWeather + ": " + curWeatherDesc} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
            <ListItemText primary="Wind" secondary = {"Current wind speed is " + curWindSpeed + " mph"} />
        </ListItem> */}
        </List>
    
    </Grid>
     
     
     
     );
}


export default Daily;
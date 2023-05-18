import { useEffect, useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
function Hourly(props) {
    const hour = props.hour;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [hourTemp, setHourTemp] = useState('');
    const [weatherCode, setWeatherCode] = useState('');
    const updateWeather = (data) => {
        setHourTemp((Math.round((data.hourly[hour].temp - 273.15) * (9/5) + 32)));
        setWeatherCode(data.hourly[hour].weather[0].icon);
    }
    useEffect( ()=> {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=$imperial&appid=${API_KEY}`)
        .then((result) => result.json())
        .then((data) => updateWeather(data))
        .catch((error) => console.log(error));
      // eslint-disable-next-line
    },[API_KEY, props.lat, props.lon]);
    return (
        <Grid
      sx={{
        width: 300,
        height: 100,
        //backgroundColor: 'primary.dark',
        border: '1px dashed grey',
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
            <ListItemText primary= {"Temperature in " + (hour+1) + " hours"} secondary = {hourTemp + "°F"} />
            <img src = {`https://openweathermap.org/img/wn/${weatherCode}@2x.png`} alt = 'weather icon'/>
        </ListItem>
        <Divider component="li" />
        </List>
    
    </Grid>
     
     
     
     );
}


export default Hourly;
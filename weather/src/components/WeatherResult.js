import { useEffect, useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Hourly from './Hourly'
import  Grid  from '@mui/material/Grid';
import  Item  from '@mui/material/Grid';
import Daily from './Daily';
function WeatherResult (props) {
    console.log(props.lat);
    console.log(props.lon);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [curTemp, setCurTemp] = useState('');
    const [curMainWeather, setCurMainWeather] = useState('');
    const [curWeatherDesc, setCurWeatherDesc] = useState('');
    const [curWindSpeed, setCurWindSpeed] = useState('');
    const [weatherCode, setWeatherCode] = useState('');
    const updateWeather = (data) => {
        setCurTemp((Math.round((data.current.temp - 273.15) * (9/5) + 32)));
        setCurMainWeather(data.current.weather[0].main);
        setCurWeatherDesc(data.current.weather[0].description);
        setCurWindSpeed(data.current.wind_speed);
        setWeatherCode(data.current.weather[0].icon);
    }
    useEffect( ()=> {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=$imperial&appid=${API_KEY}`)
        .then((result) => result.json())
        .then((data) => updateWeather(data))
        .catch((error) => console.log(error));
        //console.log(lat);
        //console.log(lon);
    },[API_KEY, props.lat, props.lon]);
const hourlyList = [];
const dailyList = [];
for (let i = 0; i < 24; i ++) {
    hourlyList.push(
    <Hourly lat = {props.lat} lon = {props.lon} hour = {i}/>
    );
}
for (let i = 0; i < 7; i ++) {
    dailyList.push(
    <Daily lat = {props.lat} lon = {props.lon} day = {i}/>
    );
}
return (
    <>
    <Grid container spacing = {0}>
    <Grid
      sx={{
        width: 300,
        height: 330,
        color: 'green',
        //backgroundColor: 'primary.dark',
       
        '&:hover': {
          backgroundColor: 'primary.yellow',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      >
      <Item>  
        <List
        sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
        }}
        >
        <ListItem>
            <ListItemText primary = "Real Time Information" align-items = 'center'/>
        </ListItem>
        <ListItem>
            <ListItemText primary="Temperature" secondary = {"Current temp is " + curTemp + "°F"} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
            <ListItemText primary="Weather" secondary = {curMainWeather + ": " + curWeatherDesc} />
            <img src = {`https://openweathermap.org/img/wn/${weatherCode}@2x.png`} alt = 'weather icon'/>
        </ListItem>
        <Divider component="li" />
        <ListItem>
            <ListItemText primary="Wind" secondary = {"Current wind speed is " + curWindSpeed + " mph"} />
            
        </ListItem>
        </List>
    </Item>
    </Grid>
    </Grid>
    
    <Grid container spacing = {0} rowSpacing = {1}>
            <List>
                <ListItem primary = "spacing"/>
                <ListItem primary = "spacing"/>
            </List>

    </Grid>
    
    <Grid container spacing = {0}>
        
        {hourlyList.map((hourData) => {
            return (
                <Grid sx={{
                    width: 300,
                    height: 140,
                    color: 'orange',
                    //backgroundColor: 'primary.dark',
                    //border: '3px dashed orange',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}> 
                  {hourData} 
                </Grid>
            );
        })
        }
    </Grid>
    {/* <Divider variant="middle" /> */}
    <Grid container spacing = {0} rowSpacing = {1}>
            <List>
                <ListItem primary = "spacing"/>
                <ListItem primary = "spacing"/>
            </List>

    </Grid>
    <Grid container spacing = {0}>
        
        {dailyList.map((dayData) => {
            return (
                <Grid sx={{
                    width: 300,
                    height: 130,
                    color: 'red',
                    //backgroundColor: 'primary.dark',
                    //border: '3px dashed orange',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}> 
                  {dayData} 
                </Grid>
            );
        })
        }
    </Grid>

    </>
);

}



export default WeatherResult;
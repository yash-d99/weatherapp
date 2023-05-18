import './App.css';
import React, {useState} from 'react'
import WeatherForm from './components/WeatherForm';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import NewsForm from './components/NewsForm';
function App() {
  const [renderWeather, setRenderWeather] = useState(true);
  const [page, setPage] = useState('weather');
  const handlePageChange = (event, newAlignment) => {
    setPage(newAlignment);
  };
  const showWeather = () => {
    setRenderWeather(true);
  }
  const showNews = () => {
    setRenderWeather(false);
  }
  return (
    <div className="App">
      <ToggleButtonGroup
        value={page}
        exclusive
        onChange={handlePageChange}
        aria-label="page changer"
      >
        <ToggleButton  
          style={{
          backgroundColor: '#4382CE',
          color: 'white',
          borderRadius: '8px',
          // Add more styles as needed
        }}  
          value="weather" aria-label="weather button" onClick = {showWeather} >
          Weather
        </ToggleButton>
        <ToggleButton style={{
          backgroundColor: '#EB5323',
          color: 'white',
          borderRadius: '8px',
          // Add more styles as needed
        }} 
        variant = "contained" value="news" aria-label="news button" onClick = {showNews}>
          News
        </ToggleButton>
      </ToggleButtonGroup>
      {renderWeather ? (
        
          <WeatherForm />
        ):
        (<div className = "News">
            <NewsForm/>
          </div>)
      }
    </div>
  );
}

export default App;

import React from 'react';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

export default function WeatherCard(props) {
  const weatherData = {
    "id": 19,
    "city": "Laguna Beach",
    "state": "CA",
    "type": "beachCities",
    "latitude": "33.5427",
    "longitude": "117.7854",
    "temp": Math.floor(Number("61.52")),
    "clouds": 100,
    "wind_speed": "7.34",
    "alerts": [
      {
        "sender_name": "NWS Tulsa",
        "event": "Heat Advisory",
        "start": 1597341600,
        "end": 1597366800,
        "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.",
        "tags": [
          "Extreme temperature value"
          ]
    }
    ]
  }
  return (
    <Paper sx={{width: '350px', height: '150px', position: 'relative', padding: '5px'}}>
      <h3 style={{margin: '0 0 5px 0'}}>{weatherData.city}, {weatherData.state}</h3>
      <span>Cloud Cover: {weatherData.clouds}%</span>
      <br/>
      <span>Wind: {weatherData.wind_speed} mph</span>
      <span style={{position: 'absolute', right: '10px', top: '10px', fontSize: '50pt', fontWeight: 500}}>{weatherData.temp}&#176;</span>
      {weatherData.alerts !== null ?
      <Alert severity="warning" sx={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>{weatherData.alerts[0].event}</Alert> :
      null
      }
    </Paper>
  )
}
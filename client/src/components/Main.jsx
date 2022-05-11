import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import WeatherCardList from './WeatherCardList'
import CurrentWeather from './CurrentWeather'

export default function Main() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null)
  const [data, setData] = useState({beachCitiesData: null, skiCitiesData: null})

  function findUserCurrentWeather(){
    function success(position) {
      axios.get(`/api/weather/${position.coords.latitude}_${position.coords.longitude}`)
      .then(results => {
        setCurrentWeatherData(results.data)
        console.log(results.data)
      })
      // setTimeout(() => {
      //   setCurrentWeatherData({temp: 69, clouds: 10, wind_speed: 7})
      // }, 1000)
    }
    function error() {
      console.log('error')
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }

  function getWeatherData() {
    axios.get('/api/allWeather')
      .then(results => {
        let [beachCitiesData, skiCitiesData] = [[],[]]
        for (let i = 0; i < results.data.length; i++) {
          if (results.data[i].type === 'beachCities') {
            if (results.data[i].reason === 'null') {
              beachCitiesData.unshift(results.data[i])
            } else {
              beachCitiesData.push(results.data[i])
            }
          } else {
            if (results.data[i].reason === 'null') {
              skiCitiesData.unshift(results.data[i])
            } else {
              skiCitiesData.push(results.data[i])
            }
          }
        }
        console.log(beachCitiesData)
        setData({beachCitiesData: beachCitiesData, skiCitiesData: skiCitiesData})
      })
  }
  useEffect(() => {
    getWeatherData();
    findUserCurrentWeather();
  }, [])

  return (
    <Paper elevation={3} sx={{paddingBottom: '15px', backgroundColor: '#F5F5F4'}}>
      <CurrentWeather data={currentWeatherData}/>
      <hr style={{width: '95%'}}/>
      <div style={{display: 'flex', justifyContent: 'space-evenly', columns: 3}}>
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beach</h1>
        <h2>&nbsp;&nbsp;- or -</h2>
        <h1>Snow?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-evenly', columns: 2}}>
        <WeatherCardList beachCitiesData={data.beachCitiesData}/>
        <WeatherCardList skiCitiesData={data.skiCitiesData}/>
      </div>
    </Paper>
  )
}
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import WeatherCard from './WeatherCard'

export default function Main() {
  const [location, setLocation] = useState({latitude: null, longitude: null})

  function findUserCurrentWeather(){
    function success(position) {
      setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
      axios.get(`/api/weather/${position.coords.latitude}_${position.coords.longitude}`)
      .then(results => {
        console.log(results.data)
      })
    }
    function error() {
      console.log('error')
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }

  useEffect(() => {
    axios.get('/api/allWeather')
      .then(results => {
        console.log(results.data)
      })
    findUserCurrentWeather()
  }, [])

  return (
    <Paper elevation={3}>
      <p>Latitude: {location.latitude} Longitude: {location.longitude}</p>
      <WeatherCard/>
    </Paper>
  )
}
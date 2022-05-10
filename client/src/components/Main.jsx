import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import WeatherCardList from './WeatherCardList'

export default function Main() {
  const [location, setLocation] = useState({latitude: null, longitude: null})
  const [data, setData] = useState({beachCitiesData: null, skiCitiesData: null})

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
    findUserCurrentWeather()
  }, [])

  return (
    <Paper elevation={3}>
      <p>Latitude: {location.latitude} Longitude: {location.longitude}</p>
      <WeatherCardList beachCitiesData={data.beachCitiesData}/>
      <WeatherCardList skiCitiesData={data.skiCitiesData}/>
    </Paper>
  )
}
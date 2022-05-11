const axios = require('axios');
const config = require('../config.js')
const cities = require('../cities.js')

const controller = {
  getWeather: (req, res) => {
    const [lat,lon] = req.params.location.split('_')
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${config.key}&units=imperial`)
      .then(results => {
        const weather = {
          lat: lat,
          lon: lon,
          temp: results.data.current.temp,
          clouds: results.data.current.temp,
          wind_speed: results.data.current.wind_speed,
          alerts: results.data.alerts !== undefined ? results.data.alerts : null
        }
        res.status(200).json(weather)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getAllWeather: (req, res) => {
    axios.get('http://localhost:3001/cities')
    .then(results => {
      res.status(200).json(results.data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = controller;
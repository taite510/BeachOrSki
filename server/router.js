let router = require('express').Router();
const controller = require('./controller.js');

router.get('/weather/:location', controller.getWeather);
router.get('/allWeather', controller.getAllWeather);

module.exports = router;
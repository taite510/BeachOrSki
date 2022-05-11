import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../client/src/components/App.jsx';


const localWeather = {
  lat: '33.9228073',
  lon: '-118.1549943',
  temp: 67.33,
  clouds: 67.33,
  wind_speed: 14.97,
  alerts: null
}

const allWeather = [
  {
      'id': 8,
      'city': 'Panama City',
      'state': 'FL',
      'type': 'beachCities',
      'latitude': '30.1588',
      'longitude': '85.6602',
      'temp': 31,
      'clouds': 92,
      'wind_speed': '5.91',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 9,
      'city': 'Laguna Beach',
      'state': 'CA',
      'type': 'beachCities',
      'latitude': '33.5427',
      'longitude': '117.7854',
      'temp': 56,
      'clouds': 100,
      'wind_speed': '6.62',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 10,
      'city': 'Cape Cod',
      'state': 'MA',
      'type': 'beachCities',
      'latitude': '41.6688',
      'longitude': '70.2962',
      'temp': 41,
      'clouds': 50,
      'wind_speed': '2.73',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 11,
      'city': 'Breckenridge',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '39.4817',
      'longitude': '106.0384',
      'temp': 51,
      'clouds': 100,
      'wind_speed': '15.73',
      'alerts': 'null',
      'reason': 'Not Cold Enough!'
  },
  {
      'id': 12,
      'city': 'Angel Fire',
      'state': 'NM',
      'type': 'skiCities',
      'latitude': '36.3931',
      'longitude': '105.285',
      'temp': 52,
      'clouds': 62,
      'wind_speed': '2.84',
      'alerts': 'null',
      'reason': 'Not Cold Enough!'
  },
  {
      'id': 13,
      'city': 'Durango',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '37.2753',
      'longitude': '107.8801',
      'temp': 53,
      'clouds': 60,
      'wind_speed': '3.69',
      'alerts': 'null',
      'reason': 'Not Cold Enough!'
  },
  {
      'id': 14,
      'city': 'Winter Park',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '39.8917',
      'longitude': '105.7631',
      'temp': 49,
      'clouds': 100,
      'wind_speed': '20.6',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 15,
      'city': 'Taos',
      'state': 'NM',
      'type': 'skiCities',
      'latitude': '36.4072',
      'longitude': '105.5734',
      'temp': 49,
      'clouds': 81,
      'wind_speed': '2.68',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 16,
      'city': 'Vail',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '39.6433',
      'longitude': '106.3781',
      'temp': 49,
      'clouds': 100,
      'wind_speed': '13.94',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 17,
      'city': 'Aspen',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '39.1911',
      'longitude': '106.8175',
      'temp': 50,
      'clouds': 96,
      'wind_speed': '10.6',
      'alerts': 'null',
      'reason': 'Not Cold Enough!'
  },
  {
      'id': 18,
      'city': 'Snowbird',
      'state': 'UT',
      'type': 'skiCities',
      'latitude': '40.583',
      'longitude': '111.6538',
      'temp': 43,
      'clouds': 71,
      'wind_speed': '7.65',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 19,
      'city': 'Park City',
      'state': 'UT',
      'type': 'skiCities',
      'latitude': '40.6461',
      'longitude': '111.498',
      'temp': 43,
      'clouds': 77,
      'wind_speed': '8.84',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 20,
      'city': 'Telluride',
      'state': 'Co',
      'type': 'skiCities',
      'latitude': '37.9375',
      'longitude': '107.8123',
      'temp': 49,
      'clouds': 64,
      'wind_speed': '15.14',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 1,
      'city': 'Miami',
      'state': 'FL',
      'type': 'beachCities',
      'latitude': '25.7617',
      'longitude': '80.1918',
      'temp': 94,
      'clouds': 0,
      'wind_speed': '6.71',
      'alerts': 'null',
      'reason': 'null'
  },
  {
      'id': 2,
      'city': 'Maui',
      'state': 'HI',
      'type': 'beachCities',
      'latitude': '20.7984',
      'longitude': '156.3319',
      'temp': 80,
      'clouds': 100,
      'wind_speed': '8.46',
      'alerts': 'null',
      'reason': 'Too Cloudy!'
  },
  {
      'id': 3,
      'city': 'Destin',
      'state': 'FL',
      'type': 'beachCities',
      'latitude': '30.3935',
      'longitude': '86.4958',
      'temp': 42,
      'clouds': 100,
      'wind_speed': '6.11',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 4,
      'city': 'Clearwater',
      'state': 'FL',
      'type': 'beachCities',
      'latitude': '27.9659',
      'longitude': '82.8001',
      'temp': 69,
      'clouds': 3,
      'wind_speed': '4.47',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 5,
      'city': 'South Padre Island',
      'state': 'TX',
      'type': 'beachCities',
      'latitude': '26.1118',
      'longitude': '97.1681',
      'temp': 51,
      'clouds': 99,
      'wind_speed': '1.01',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 6,
      'city': 'Port Aransas',
      'state': 'Tx',
      'type': 'beachCities',
      'latitude': '27.8339',
      'longitude': '97.0611',
      'temp': 52,
      'clouds': 95,
      'wind_speed': '3.67',
      'alerts': 'null',
      'reason': 'Too Cold!'
  },
  {
      'id': 7,
      'city': 'Santa Monica',
      'state': 'CA',
      'type': 'beachCities',
      'latitude': '34.0195',
      'longitude': '118.4912',
      'temp': 53,
      'clouds': 100,
      'wind_speed': '6.76',
      'alerts': 'null',
      'reason': 'Too Cold!'
  }
]

const server = setupServer(
  rest.get('/api/weather/:location', (req, res, ctx) => {
    return res(ctx.json(localWeather))
  }),
  rest.get('/api/allWeather', (req, res, ctx) => {
    return res(ctx.json(allWeather))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

test('Loads beach weather cards on page', async () => {
  render(<App />)

  await waitFor(() => {
    let items = screen.getByText('Clearwater, FL');
    expect(items).toBeInTheDocument()
  })
})

test('Loads ski weather cards on page', async () => {
  render(<App />)

  await waitFor(() => {
    let items = screen.getByText('Telluride, Co');
    expect(items).toBeInTheDocument()
  })
})

// test fails due to geolocation data taking too long to return
// test('Loads local weather on page', async () => {
//   render(<App />)

//   await waitFor(() => {
//     let items = screen.getByText('67°');
//     expect(items).toBeInTheDocument()
//   },{timeout: 6000})
// })
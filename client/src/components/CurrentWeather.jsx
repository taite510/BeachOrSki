import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

export default function CurrentWeather(props) {

  return (
    <div style={{padding: '10px 20px', position: 'relative', height: '150px'}}>
      <h1 style={{margin: 0, fontSize: '35pt'}}>Current Weather:</h1>
      {props.data !== null ?
        <>
          <span>Cloud Cover: {props.data.clouds}%</span>
          <br/>
          <span>Wind: {Math.floor(props.data.wind_speed)} mph</span>
        </> :
        <>
          <Skeleton width={130} variant="text" />
          <Skeleton width={110} variant="text" />
        </>
      }
      <div style={{position: 'absolute', top: '20px', right: '200px'}}>
        {props.data !== null ?
          <span style={{fontSize: '70pt', fontWeight: 700}}>{Math.floor(props.data.temp)}&#176;</span> :
          <CircularProgress size={100}/>
        }
      </div>

    </div>
  )
}
import React from 'react';
import Stack from '@mui/material/Stack';
import WeatherCard from './WeatherCard'
import CircularProgress from '@mui/material/CircularProgress';

export default function WeatherCardList(props) {

  const isBeach = props.beachCitiesData !== undefined ? true : false;
  const dataArr = isBeach ? props.beachCitiesData : props.skiCitiesData;
  if (!dataArr) {
    return (
      <CircularProgress />
    )
  }
  return(
    <Stack spacing={2}>
      {dataArr.map((data, index) => {
        return(
          <WeatherCard data={data} key={index}/>
        )
      })}
    </Stack>
  )
}
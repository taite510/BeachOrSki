import React from 'react';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function WeatherCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const weatherData = props.data
  weatherData.temp = Math.floor(weatherData.temp)
  let conditions = {
    backgroundColor: weatherData.reason === 'null' ? '#b9ffbd' : '#eeeeee'
  }

  let goodOrBadIcon = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    color: weatherData.reason === 'null' ? '#008707' : '#fd8888',
    cursor: 'pointer',
    fontSize: '20pt'
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Paper sx={{width: '350px', height: '150px', position: 'relative', padding: '5px', backgroundColor: conditions.backgroundColor}}>
      <h3 style={{margin: '0 0 5px 0'}}>{weatherData.city}, {weatherData.state}</h3>
      <span>Cloud Cover: {weatherData.clouds}%</span>
      <br/>
      <span>Wind: {weatherData.wind_speed} mph</span>
      {weatherData.reason === 'null' ?
      <CheckCircleOutlineIcon id='myshgef' onClick={handleClick} sx={goodOrBadIcon}/> :
      <ErrorOutlineIcon onClick={handleClick} sx={goodOrBadIcon}/>
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {weatherData.reason === 'null' ? 'Perfect Weather!' : weatherData.reason}
        </Typography>
      </Popover>
      <span style={{position: 'absolute', right: '25px', top: '15px', fontSize: '50pt', fontWeight: 500}}>{weatherData.temp}&#176;</span>
      {weatherData.alerts !== 'null' ?
      <Alert severity="warning" sx={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>{weatherData.alerts}</Alert> :
      null
      }
    </Paper>
  )
}
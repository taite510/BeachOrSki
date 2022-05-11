import React from 'react';
import Main from './Main'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function App() {
  return (
    <div style={{backgroundImage: 'linear-gradient(to right, #F9D199, #B6D5F3)'}}>
      <CssBaseline/>
      <Container maxWidth="md" sx={{padding: '10px 0'}}>
        <Main/>
      </Container>
    </div>
  )
}
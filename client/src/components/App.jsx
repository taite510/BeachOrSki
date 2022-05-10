import React from 'react';
import Main from './Main'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="xl">
        <Main/>
      </Container>
    </React.Fragment>
  )
}
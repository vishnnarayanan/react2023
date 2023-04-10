import { Container } from '@mui/material';
import React from 'react';
import './App.css';
// import SignInSide from './components/signin/Signin';
import ColorChooser from './components/ColorChooser/ColorChooser';
function App() {
  // return <SignInSide />;
  return (
    <Container>
      <ColorChooser />
    </Container>
  );
}

export default App;

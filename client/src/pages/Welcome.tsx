import React from 'react';
import Container from '@mui/material/Container';
import SignIn from '../components/SignIn';

function Welcome() {
  return (
    <Container component="main" maxWidth="xs">
      <SignIn />
    </Container>
  );
}

export default Welcome;

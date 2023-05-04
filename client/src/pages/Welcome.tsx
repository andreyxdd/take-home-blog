import React from 'react';
import Container from '@mui/material/Container';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import useUserContext from '../hooks/useUserContext';

function Welcome() {
  const { userWantsSignIn } = useUserContext();
  return (
    <Container component="main" maxWidth="xs">
      {userWantsSignIn ? <SignIn /> : <SignUp />}
    </Container>
  );
}

export default Welcome;

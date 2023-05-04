import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import WelcomePage from './pages/Welcome';
import BlogPage from './pages/Blog';
import Footer from './components/Footer';
import { UserContextProvider } from './context';
import useUserContext from './hooks/useUserContext';

const theme = createTheme();

function Content() {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: '100vh',
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? <BlogPage /> : <WelcomePage />;
}

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Content />
        <Footer
          description="Proudly created by Andrei Volkov"
        />
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;

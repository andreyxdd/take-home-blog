import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import WelcomePage from './pages/Welcome';
import BlogPage from './pages/Blog';
import Footer from './components/Footer';
import { UserContextProvider } from './context';
import useUserContext from './hooks/useUserContext';

const theme = createTheme();

function Content() {
  const { user } = useUserContext();
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

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const theme = createTheme();

const sampleSections = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Take Home Blog Node.js" sections={sampleSections} />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main posts={[]} title="Posts" />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Small take home project"
        description="Proudly created by Andrei Volkov"
      />
    </ThemeProvider>
  );
}

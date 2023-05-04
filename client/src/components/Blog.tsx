import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { PostProps } from '../types';

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
  const [posts, setPosts] = React.useState<Array<PostProps>>([]);

  React.useEffect(() => {
    fetch(`http://localhost:4000/api/blog/posts?${new URLSearchParams({
      page: '1',
      limit: '3',
    })}`)
      .then((results) => results.json())
      .then((results) => {
        const { data } = results;
        setPosts(data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Take Home Blog Node.js" sections={sampleSections} />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }} justifyContent="center">
            <Main posts={posts} mainTitle="Posts" />
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

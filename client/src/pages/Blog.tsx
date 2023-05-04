import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import Main from '../components/Main';
import { PostProps } from '../types';
import { getPosts } from '../services/blog';

export default function Blog() {
  const [posts, setPosts] = React.useState<Array<PostProps>>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  React.useEffect(() => {
    getPosts(1, 3)
      .then((results) => {
        // console.log(results);
        setTotalPages(results.totalPages);
        setPosts(results.data);
      });
  }, []);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getPosts(value, 3)
      .then((results) => {
        // console.log(results);
        setTotalPages(results.totalPages);
        setPosts(results.data);
      });
  };

  return (
    <Container maxWidth="lg">
      <Header title="Take Home Blog Node.js" />
      <main>
        <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
          <Main posts={posts} mainTitle="Posts" />
        </Grid>
      </main>
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Stack spacing={2} justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Container>
  );
}

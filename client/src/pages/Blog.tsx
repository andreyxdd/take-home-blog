import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import Main from '../components/Main';
import usePosts from '../hooks/queries/usePosts';

export default function Blog() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = usePosts({ page, limit: 3 });

  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!data) return null;

  const {
    data: posts,
    totalPages,
  } = data;

  return (
    <Container maxWidth="lg">
      <Header title="Take Home Blog Node.js" />
      <main>
        {isLoading
          ? <CircularProgress /> : (
            <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
              <Main posts={posts} />
            </Grid>
          )}
      </main>
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Stack spacing={2} justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Container>
  );
}

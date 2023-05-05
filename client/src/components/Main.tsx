import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PostProps } from '../types';
import Post from './Post';
import NewPost from './NewPost';
import Dropdown from './Dropdown';

interface MainProps {
  posts: Array<PostProps>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function Main({ posts, limit, setLimit }: MainProps) {
  return (
    <Grid item xs={8}>
      <Typography variant="h6" gutterBottom>
        Add new post
      </Typography>
      <NewPost />
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Posts
          </Typography>
        </Grid>
        <Grid item>
          <Dropdown limit={limit} setLimit={setLimit} />
        </Grid>
      </Grid>
      <Grid container spacing={3} direction="column">
        {posts.map(({
          id, title, content, updatedAt, author,
        }) => (
          <Grid item key={id + author.id} flexGrow={1}>
            <Post
              id={id}
              title={title}
              content={content}
              updatedAt={updatedAt}
              authorName={author.name}
              authorId={author.id}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PostProps } from '../types';
import Post from './Post';
import NewPost from './NewPost';

interface MainProps {
  posts: Array<PostProps>;
}

export default function Main({ posts }: MainProps) {
  return (
    <Grid item xs={8}>
      <Typography variant="h6" gutterBottom>
        Add new post
      </Typography>
      <NewPost />
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Posts
      </Typography>
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

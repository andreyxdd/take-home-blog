import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PostProps } from '../types';
import Post from './Post';

interface MainProps {
  posts: Array<PostProps>;
  mainTitle: string;
}

export default function Main({ posts, mainTitle }: MainProps) {
  return (
    <Grid item xs={8}>
      <Typography variant="h6" gutterBottom>
        {mainTitle}
      </Typography>
      <Divider />
      <Grid container spacing={3}>
        {posts.map(({
          id, title, content, updatedAt, author,
        }) => (
          <Grid item>
            <Post
              key={id + author.id}
          // id={id}
              title={title}
              content={content}
              updatedAt={updatedAt}
              authorName={author.name}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

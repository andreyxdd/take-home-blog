import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid } from '@mui/material';
import { format } from 'date-fns';

type PostComponentProps = {
  // id: number;
  updatedAt: string;
  title: string;
  content: string;
  // authorId: string;
  authorName: string;
}

function Post({
  title, content, updatedAt, authorName,
}: PostComponentProps) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          {format(new Date(updatedAt), 'PPpp')}
          {' '}
          by
          {' '}
          <b>{authorName}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button size="small" color="primary">
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" color="secondary">
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default Post;

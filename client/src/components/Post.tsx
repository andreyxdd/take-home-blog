import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

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
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          {updatedAt}
          {' '}
          by
          {' '}
          {authorName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;

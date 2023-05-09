import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid } from '@mui/material';
import { format } from 'date-fns';
import useUserContext from '../hooks/useUserContext';
import useDeletePostMutation from '../hooks/mutations/useDeletePostMutation';

type PostComponentProps = {
  id: number;
  updatedAt: string;
  title: string;
  body: string;
  authorName: string;
  authorId: string;
}

function Post({
  id, title, body, updatedAt, authorName, authorId,
}: PostComponentProps) {
  const { mutate } = useDeletePostMutation();
  const { user } = useUserContext();
  if (!user) return null;

  const isUsersPost = authorId === user.id;

  const handlePostDeletion = () => {
    mutate(id);
  };

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
          {isUsersPost ? 'you' : <b>{authorName}</b>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      {isUsersPost ? (
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                size="small"
                sx={{ ml: 1 }}
                color="primary"
                variant="contained"
                disabled
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                sx={{ mr: 1 }}
                color="secondary"
                onClick={handlePostDeletion}
                variant="contained"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
    </Card>
  );
}

export default Post;

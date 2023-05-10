import * as React from 'react';
import {
  CardActions, Grid, Typography, CardContent, Card,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';
import useUserContext from '../hooks/useUserContext';
import useDeletePostMutation from '../hooks/mutations/useDeletePostMutation';
import useEditPostMutation from '../hooks/mutations/useEditPostMutation';

type PostComponentProps = {
  id: string;
  updatedAt: string;
  title: string;
  body: string;
  authorName: string;
  authorId: string;
}

function Post({
  id, title, body, updatedAt, authorName, authorId,
}: PostComponentProps) {
  const [newTitle, setNewTitle] = React.useState<string>(title);
  const [newBody, setNewBody] = React.useState<string>(body);
  const { mutate: deleteMutation, isLoading: isDeleteLoading } = useDeletePostMutation();
  const { mutate: editMutation, isLoading: isEditLoading } = useEditPostMutation();
  const { user } = useUserContext();
  if (!user) return null;

  const isUsersPost = authorId === user.id;

  const handlePostDeletion = () => {
    deleteMutation(id);
  };
  const handleEditPost = () => {
    if (newTitle && newBody) {
      editMutation({ id, body: newBody, title: newTitle });
    } else {
      // handle empty inputs
    }
  };
  const handleTitleChange = (e: React.FormEvent<HTMLElement>) => {
    const input = e.target as HTMLElement;
    setNewTitle(input.innerText);
  };
  const handleBodyChange = (e: React.FormEvent<HTMLElement>) => {
    const input = e.target as HTMLElement;
    setNewBody(input.innerText);
  };

  const sameAsOldPost = newTitle === title && newBody === body;

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          contentEditable
          suppressContentEditableWarning
          display="inline"
          onInput={handleTitleChange}
        >
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          {format(new Date(updatedAt), 'PPpp')}
          {' '}
          by
          {' '}
          {isUsersPost ? 'you' : <b>{authorName}</b>}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          contentEditable
          suppressContentEditableWarning
          onInput={handleBodyChange}
        >
          {body}
        </Typography>
      </CardContent>
      {isUsersPost ? (
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <LoadingButton
                size="small"
                sx={{ ml: 1 }}
                color="primary"
                variant="contained"
                onClick={handleEditPost}
                loading={isEditLoading}
                disabled={isEditLoading || sameAsOldPost}
              >
                Save
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                size="small"
                sx={{ mr: 1 }}
                color="secondary"
                onClick={handlePostDeletion}
                variant="contained"
                loading={isDeleteLoading}
                disabled={isDeleteLoading}
              >
                Delete
              </LoadingButton>
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
    </Card>
  );
}

export default Post;

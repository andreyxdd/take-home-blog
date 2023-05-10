import * as React from 'react';
import {
  CardActions, Grid, TextField, CardContent, Card, Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAddPostMutation from '../hooks/mutations/useAddPostMutation';

function NewPost() {
  const { mutateAsync, isLoading } = useAddPostMutation();
  const [files, setFiles] = React.useState<FileList>();
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const formData = new FormData();

    if (files) {
      // eslint-disable-next-line no-restricted-syntax
      for (const f of files) {
        formData.append('files', f);
      }
    }

    if (title && body) {
      formData.set('title', title);
      formData.set('body', body);

      // posting a new post
      await mutateAsync(formData);

      // resseting state and clearing the form
      setTitle('');
      setBody('');
      setFiles(undefined);
      formData.delete('title');
      formData.delete('body');
      formData.delete('files');
    }
  };

  return (
    <Box component="form" noValidate>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Title"
                placeholder="Title"
                fullWidth
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Post"
                placeholder="Share your thoughts"
                multiline
                rows={4}
                fullWidth
                name="body"
                id="body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required
                variant="standard"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <input
                type="file"
                name="file"
                id="files"
                style={{ marginLeft: 5 }}
                multiple
                onChange={(e) => {
                  if (e.target.files) setFiles(e.target.files);
                }}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="button"
                size="small"
                color="primary"
                sx={{ mr: 1 }}
                variant="contained"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

export default NewPost;

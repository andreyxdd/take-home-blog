import * as React from 'react';
import {
  Button, CardActions, Grid, TextField, CardContent, Card, Box,
} from '@mui/material';
import useAddPostMutation from '../hooks/mutations/useAddPostMutation';

function NewPost() {
  const { mutate } = useAddPostMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title'));
    const content = String(data.get('content'));
    if (title && content) {
      mutate({ title, content });
    }
    event.currentTarget.reset();
  };

  return (
    <Box component="form" onClick={handleSubmit} noValidate>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                placeholder="Title"
                fullWidth
                name="title"
                id="title"
              />
            </Grid>
            <Grid item>
              <TextField
                placeholder="Share your thoughts"
                multiline
                rows={4}
                fullWidth
                name="content"
                id="content"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                size="small"
                color="primary"
                type="submit"
              >
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="secondary">
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

export default NewPost;

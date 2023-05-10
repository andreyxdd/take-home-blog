export type EditPostProps = {
  id: string;
  title: string;
  body: string;
}

export type PostProps = EditPostProps & {
  updatedAt: string;
  files: FileList | null;
  author: {
    id: string;
    name: string;
  }
}

export type UserProps = {
  name: string;
  email: string;
  id: string;
}

export type CredentialsProps = {
  email: string;
  password: string;
  name?: string;
}

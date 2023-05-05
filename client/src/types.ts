export type PostProps = {
  id: number;
  updatedAt: string;
  title: string;
  content: string;
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

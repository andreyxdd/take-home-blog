export type PostProps = {
  id: number;
  updatedAt: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  }
}

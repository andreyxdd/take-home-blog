import { axiosAuthInstance, handleError } from './index';
import { PostProps } from '../types';

type GetPostsProps = {
  data: Array<PostProps>;
  totalPages: number;
}

export const getPosts = async (page: number, limit = 20) => {
  try {
    const { data }: { data: GetPostsProps } = await axiosAuthInstance.get(
      `${process.env.REACT_APP_API_URL}/api/blog/posts`,
      { params: { page, limit } },
    );
    return data;
  } catch (error: any) {
    handleError(error);
    return { data: [] as Array<PostProps>, totalPages: 0 };
  }
};

export const addPost = async ({ title, content }: Pick<PostProps, 'title'|'content'>) => {
  try {
    await axiosAuthInstance.post(
      `${process.env.REACT_APP_API_URL}/api/blog/posts`,
      { title, content },
      { withCredentials: true },
    );
    return true;
  } catch (error: any) {
    handleError(error);
    return false;
  }
};

export const deletePost = async (postId: number): Promise<boolean> => {
  try {
    await axiosAuthInstance.delete(
      `${process.env.REACT_APP_API_URL}/api/blog/post`,
      { params: { id: postId } },
    );
    return true;
  } catch (error: any) {
    handleError(error);
    return false;
  }
};

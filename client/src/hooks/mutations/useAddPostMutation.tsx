import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '../../services/blog';
import { PostProps } from '../../types';

const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (
      { title, content }: Pick<PostProps, 'title' | 'content'>,
    ) => addPost({ title, content }),
    onSuccess: async (isAdded: boolean) => {
      if (isAdded) await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
};

export default useAddPostMutation;

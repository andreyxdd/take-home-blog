import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../services/blog';

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: async (isDeleted: boolean) => {
      if (isDeleted) await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
};

export default useDeletePostMutation;

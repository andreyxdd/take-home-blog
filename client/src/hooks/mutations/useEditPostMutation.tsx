import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost } from '../../services/blog';
import { EditPostProps } from '../../types';

const useEditMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, title, body }: EditPostProps) => editPost({ id, title, body }),
    onSuccess: async (isEdited: boolean) => {
      if (isEdited) await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
};

export default useEditMutation;

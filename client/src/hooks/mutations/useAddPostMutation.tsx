import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '../../services/blog';

const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: any) => addPost(formData),
    onSuccess: async (isAdded: boolean) => {
      if (isAdded) await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
};

export default useAddPostMutation;

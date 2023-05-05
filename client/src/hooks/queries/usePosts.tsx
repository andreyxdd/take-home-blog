import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/blog';
import useUserContext from '../useUserContext';

type PaginationProps = {
  page: number;
  limit?: number;
}

const usePosts = ({ page, limit }: PaginationProps) => {
  const { user } = useUserContext();
  const query = useQuery({
    queryKey: ['posts', user?.id, page, limit],
    queryFn: () => getPosts(page, limit),
    enabled: !!user,
    staleTime: Infinity,
  });
  return query;
};

export default usePosts;

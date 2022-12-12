import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

const fetcher = (url) => fetch(url).then((res) => res.json());

// eslint-disable-next-line consistent-return
const fetchWithCache = async (url) => {
  try {
    const data = await queryClient.fetchQuery([url], () => fetcher(url));
    return data;
  } catch (error) {
    console.error('Fetch failed', error);
  }
};

export default fetchWithCache;

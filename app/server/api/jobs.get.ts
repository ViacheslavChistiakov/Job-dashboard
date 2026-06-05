import axios from 'axios';
import type { Job } from '~/types/job';


export const getJobs = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.mockApiPort;
  const page = ref<number>(1);
  const pageSize = ref<number>(5);
  const hasMore = ref<boolean>(true);
  const jobs = ref<Job[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<null | unknown>(null);

  const fetchJobs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.get<Job[]>(
        `${apiUrl}/jobs?page=${page.value}&limit=${pageSize.value}`,
      );
      const jobsData = data || [];
      if (jobsData.length < pageSize.value) {
        hasMore.value = false;
      }
      jobs.value.push(...jobsData);
      page.value++;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data || err.message;
      } else if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unknown error';
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    jobs,
    loading,
    hasMore,
    error,
    fetchJobs,
  };
};

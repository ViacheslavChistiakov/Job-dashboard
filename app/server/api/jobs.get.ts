import axios from 'axios';
import type { Job } from '~/types/job';

// Pagination state
const page = ref<number>(1);
const pageSize = ref<number>(5);
const hasMore = ref<boolean>(true);

// Dta Searching state
const searchQuery = ref<string>('');
const jobs = ref<Job[]>([]);
const loading = ref<boolean>(false);
const error = ref<null | unknown>(null);

export const getJobs = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.mockApiPort;

  // Filter jobs based on their titles
  const filteredJobs = computed(() => {
    const query = searchQuery.value.toLowerCase();
    if (!query) return jobs.value;

    return jobs.value.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      const titleWords = jobTitle.split(/\s+/);
      return titleWords.some((word) => word.startsWith(query));
    });
  });

  const fetchJobs = async () => {
    loading.value = true;
    error.value = null;
    if (searchQuery.value.trim() === '') {
      if (page.value === 1 || jobs.value.length === 0 || !hasMore.value) {
        page.value = 1;
        hasMore.value = true;
        jobs.value = []; 
      }
    }
    try {
      //Choose between search and pagination endpoint
      const isSearching = searchQuery.value.trim() !== '';
      const url = isSearching
        ? `${apiUrl}/jobs`
        : `${apiUrl}/jobs?page=${page.value}&limit=${pageSize.value}`;
      const { data } = await axios.get<Job[]>(url);
      const jobsData = data || [];
      // If searching, replace the jobs list. If paginating, append to it.
      if (isSearching) {
        jobs.value = jobsData;
        hasMore.value = false;
      } else {
        if (jobsData.length < pageSize.value) {
          hasMore.value = false;
        }
        jobs.value.push(...jobsData);
        page.value++;
      }
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
  
  const resetPagination = () => {
    page.value = 1;
    hasMore.value = true;
    jobs.value = [];
  };

  // Submit handler
  const handleSearchingSubmit = () => {
    if (!searchQuery.value.trim()) {
      resetPagination();
    }
    fetchJobs();
  };

  return {
    jobs: filteredJobs,
    searchQuery,
    loading,
    hasMore,
    error,
    fetchJobs,
    handleSearchingSubmit,
  };
};

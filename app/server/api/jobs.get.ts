import axios from "axios";
import type { Job } from "~/types/job";

export const getJobs =  () => {
    const jobs = ref<Job[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<null | unknown>(null);

    const fetchJobs = async () => {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await axios.get<Job[]>('https://6a20792be96c1d13b5877d0e.mockapi.io/api/v1/jobs');
            jobs.value = data.slice(0, 10); 
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
    }

    return {
        jobs,
        loading,
        error,
        fetchJobs
    };
}
<template>
  <div class="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-start md:flex-row sx:flex-col">
    <aside
      class="w-full md:w-[35%] bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm sticky top-6 max-h-[90vh] overflow-y-auto"
    >
      <NuxtLink
        to="/"
        class="text-sm text-blue-500 hover:underline inline-flex items-center gap-1 mb-4"
      >
        ← Back to Jobs
      </NuxtLink>

      <div v-if="status === 'pending'" class="space-y-3 animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>

      <div v-else-if="job" class="space-y-5">
        <div>
          <span
            class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider"
            >You are applying for:</span
          >
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ job.title }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ job.company }} • {{ job.location }}
          </p>
          <span
            class="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {{ job.type }} / {{ job.level }}
          </span>
        </div>

        <hr class="border-gray-100 dark:border-gray-700" />

        <div>
          <h3
            class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2"
          >
            Role Description
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ job.description }}
          </p>
        </div>

        <div v-if="job.requirements && job.requirements.length">
          <h3
            class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2"
          >
            Requirements
          </h3>
          <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li v-for="(req, index) in job.requirements" :key="index">{{ req }}</li>
          </ul>
        </div>

        <div v-if="job.responsibilities && job.responsibilities.length">
          <h3
            class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2"
          >
            Responsibilities
          </h3>
          <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li v-for="(resp, index) in job.responsibilities" :key="index">{{ resp }}</li>
          </ul>
        </div>
      </div>
    </aside>
    <ApplyForm :job-id="jobId" @submit="handleFormSubmit" @cancel="navigateTo('/')" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { Job } from '~/types/job';

const route = useRoute();
const jobId = route.params.id as string;

const config = useRuntimeConfig();
const apiUrl = config.public.mockApiPort; 

const job = ref<Job | null>(null);
const status = ref<'pending' | 'idle' | 'error'>('pending');
const error = ref<string | null>(null);

const fetchJobDetails = async () => {
  status.value = 'pending';
  error.value = null;

  try {
    const url = `${apiUrl}/jobs`;
    const response = await axios.get<Job[]>(url, {
      params: { id: jobId },
    });

    const data = response.data;
    if (Array.isArray(data)) {
      job.value = data.find((j: Job) => String(j.id) === jobId) || null;
    } else {
      job.value = data;
    }

    status.value = 'idle';
  } catch (err: any) {
    status.value = 'error';
    error.value = err.message || 'Failed to fetch job description';
    console.error('Axios error:', err);
  }
};

onMounted(() => {
  fetchJobDetails();
});

const handleFormSubmit = async (formData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.log('Sending submission payload backend:', { jobId, ...formData });
  alert('Application sent successfully!');
  navigateTo('/');
};
</script>

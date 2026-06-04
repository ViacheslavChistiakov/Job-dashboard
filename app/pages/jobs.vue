<template>
  <div class="p-10 flex margin-auto  min-h-screen">
    <h2 class="text-2xl font-bold mb-4">Jobs</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="job in jobs" :key="job.id">{{ job.title }}</li>
      </ul>
    </div>
    <div v-if="error" class="text-red-500 mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '@/types/job';
import { getJobs } from '@/server/api/jobs.get';

const { jobs, loading, error, fetchJobs } = getJobs();

onMounted(() => {
  fetchJobs();
});
</script>

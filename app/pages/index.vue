<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Job Listings</h1>
    <div v-for="job in jobs" :key="job.id">
      <JobCard :job="job" />
    </div>
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div ref="trigger" class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
import { getJobs } from '@/server/api/jobs.get';
import JobCard from '@/components/job/JobCard.vue';
const { jobs, loading, error, hasMore, fetchJobs } = getJobs();
const trigger = ref<HTMLDivElement | null>(null);
let isFetching = false;
onMounted(async () => {
  await fetchJobs();
  await nextTick();
  const observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0] as IntersectionObserverEntry;
      if (entry.isIntersecting && !loading.value && hasMore.value) {
        isFetching = true;
        await fetchJobs();
        isFetching = false;
      }
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    },
  );
  if (trigger.value) {
    observer.observe(trigger.value);
  }
});
</script>

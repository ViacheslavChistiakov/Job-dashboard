<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Job Listings</h1>
    <div :key="searchQuery" class="text-gray-500 mb-4">
      <div v-for="job in jobs" :key="job.id">
        <JobCard :job="job" :searchQuery="searchQuery" />
      </div>
    </div>
    <div v-if="jobs.length === 0 && !loading" class="text-gray-500 text-center py-8">
      No jobs found matching "{{ searchQuery }}".
    </div>
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-show="hasMore" ref="trigger" class="h-10 w-full bg-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { getJobs } from '@/server/api/jobs.get';
import JobCard from '@/components/job/JobCard.vue';
const { jobs, loading, error, hasMore, fetchJobs, searchQuery } = getJobs();
const trigger = ref<HTMLDivElement | null>(null);
let isFetching = false;
const loadUntilEnd = async () => {
  while (
    trigger.value &&
    trigger.value.getBoundingClientRect().top < window.innerHeight &&
    hasMore.value &&
    !loading.value
  ) {
    isFetching = true;
    await fetchJobs();
    isFetching = false;
  }
};
watch(searchQuery, async (newQuery) => {
  if (!newQuery) {
    await fetchJobs();
    await nextTick();
    await loadUntilEnd();
  }
});
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
        await nextTick();
        await loadUntilEnd();
      }
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    },
  );
  watch(
    trigger,
    (newElement) => {
      if (newElement) {
        observer.observe(newElement);
      }
    },
    { immediate: true },
  );
});
</script>

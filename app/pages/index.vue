<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Job Listings</h1>
        <div v-for="job in jobs" :key="job.id">
            <JobCard :job="job" />
        </div>
    </div>
</template>

<script setup lang="ts">    
import { getJobs } from '@/server/api/jobs.get';
import JobCard from '@/components/job/JobCard.vue';
const { jobs, loading, error, fetchJobs } = getJobs();
onMounted(() => {
    fetchJobs();
});
</script>
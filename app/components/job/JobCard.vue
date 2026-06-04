<template>
    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 class="text-xl font-bold mb-2">{{ job.title }}</h1>
        <p class="text-gray-600 mb-4">{{ job.company }}</p>
        <p class="text-gray-600 mb-4">{{ job.location }}</p>
        <p class="text-gray-600 mb-4">{{ job.type }}</p>
        <p class="text-gray-600 mb-4">{{ job.level }}</p>
        <p class="text-gray-600 mb-4">{{ job.salary }}</p>
        <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{{ job.id }}</span>
    </div>
</template>

<script setup lang="ts">
import type { Job } from "~/types/job"

defineProps<{
  job: Job
}>()
</script>
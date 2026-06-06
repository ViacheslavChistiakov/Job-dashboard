<template>
    <div class="dark:bg-gray-800 shadow-md  w-full flex justify-between rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg md:flex-row xs:w-1/2 flex-col">
        <h1 class="font-[Inter] font-mono text-xl font-bold mb-2">{{ job.title }}</h1>
        <p class="font-[Inter] font-sans text-gray-600 mb-4">{{ job.company }}</p>
        <p class="font-[Inter] font-sans text-gray-600 mb-4">{{ job.location }}</p>
        <p class="font-[Inter] font-sans text-gray-600 mb-4">{{ job.type }}</p>
        <p class="font-[Inter] font-sans text-gray-600 mb-4">{{ job.level }}</p>
        <p class="font-[Inter] font-sans text-gray-600 mb-4">{{ job.salary }}</p>
        <button @click="openModal(job)" class="flex font-[Inter] text-center rounded-full bg-blue-500 font-serif text-white hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 md:w-[18%] items-center justify-center sm:w-full">View Details</button>
    </div>
    <JobModal :job="selectedJob" :isOpen="isModalOpen" @close="closeModal" />
</template>

<script setup lang="ts">
import type { Job } from "~/types/job"
const selectedJob = ref<Job | null>(null);
const isModalOpen = ref(false);

const openModal = (job: Job) => {
  selectedJob.value = job;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedJob.value = null;
  isModalOpen.value = false;
};

// Prevent background scrolling when modal is open
watch(isModalOpen, (value) => {
  document.body.style.overflow = value ? "hidden" : "auto"
})

defineProps<{
  job: Job
}>()
</script>
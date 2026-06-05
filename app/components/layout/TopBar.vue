<template>
  <div class="p-4 shadow-md">
    <div class="flex items-center gap-6">
      <svg width="49" height="49" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <rect width="49" height="49" rx="10" fill="#2563EB" />
        <text
          x="50%"
          y="55%"
          text-anchor="middle"
          fill="white"
          font-size="16"
          font-family="Inter, sans-serif"
          font-weight="700"
        >
          JB
        </text>
      </svg>

      <div class="flex flex-1 items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          @keydown.enter="handleSearchingSubmit"
          @input="onInputCheck"
          placeholder="Search jobs..."
          class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <button @click="toggleTheme" aria-label="Toggle theme" class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <span>{{ colorMode.value === 'dark' ? '🌙' : '☀️' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getJobs } from '@/server/api/jobs.get';
const {  searchQuery,  handleSearchingSubmit, fetchJobs } = getJobs();
const onInputCheck = () => {
  if (searchQuery.value.trim() === '') {
    handleSearchingSubmit();
  }
}
onMounted(() => {
  fetchJobs();
});

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

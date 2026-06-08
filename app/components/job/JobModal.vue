<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div
      class="dark:bg-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-white rounded-2xl shadow-2xl"
    >
      <div class="dark:bg-gray-800 w-full flex flex-col sticky top-0 z-10 bg-white/100 pt-6 px-6">
        <div class="w-full flex flex-row justify-between items-center">
          <h2 class="text-xl font-bold">
            {{ job?.title }}
          </h2>
          <button class="mt-0" @click="emit('close')">❌</button>
        </div>

        <p class="text-gray-500">{{ job?.company }} • {{ job?.location }}</p>

        <hr class="my-4" />
      </div>

      <div class="pb-6 px-6">
        <h3 class="font-semibold">Description</h3>
        <p class="mb-4">{{ job?.description }}</p>

        <h3 class="font-semibold">Responsibilities</h3>
        <ul>
          <li v-for="(item, i) in job?.responsibilities" :key="i">• {{ item }}</li>
        </ul>

        <h3 class="font-semibold mt-4">Requirements</h3>
        <ul>
          <li v-for="(item, i) in job?.requirements" :key="i">• {{ item }}</li>
        </ul>

        <h3 class="font-semibold mt-4">Benefits</h3>
        <ul>
          <li v-for="(item, i) in job?.benefits" :key="i">• {{ item }}</li>
        </ul>
        <button
          class="font-[Inter] font-medium w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          @click="navigateTo(`/jobs/${job?.id}/apply`)"
        >
            Apply now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Job } from '~/types/job';
defineProps<{
  job: Job | null;
  isOpen: boolean;
}>();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

const emit = defineEmits<{
  (e: 'close'): void;
}>();

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

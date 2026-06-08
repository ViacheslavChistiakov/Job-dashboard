<template>
  <form @submit.prevent="handleSubmit" class="w-full space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Full Name *</label>
      <input 
        v-model="form.fullName" 
        type="text" 
        placeholder="Your name"
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        :class="{'border-red-500 focus:ring-red-500': errors.fullName}"
      />
      <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address *</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="you@example.com"
          class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          :class="{'border-red-500 focus:ring-red-500': errors.email}"
        />
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone Number *</label>
        <input 
          v-model="form.phone" 
          type="tel" 
          placeholder="+1 (555) 000-0000"
          class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          :class="{'border-red-500 focus:ring-red-500': errors.phone}"
        />
        <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Current Location *</label>
        <input 
          v-model="form.location" 
          type="text" 
          placeholder="e.g., Tbilisi, Georgia"
          class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          :class="{'border-red-500 focus:ring-red-500': errors.location}"
        />
        <p v-if="errors.location" class="text-red-500 text-xs mt-1">{{ errors.location }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Salary Expectation (Monthly) *</label>
        <input 
          v-model="form.salary" 
          type="text" 
          placeholder="e.g., $3,000"
          class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          :class="{'border-red-500 focus:ring-red-500': errors.salary}"
        />
        <p v-if="errors.salary" class="text-red-500 text-xs mt-1">{{ errors.salary }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Cover Letter *</label>
      <textarea 
        v-model="form.coverLetter" 
        rows="5" 
        placeholder="Tell us why you are a great fit for this position..."
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y min-h-[120px]"
        :class="{'border-red-500 focus:ring-red-500': errors.coverLetter}"
      ></textarea>
      <p v-if="errors.coverLetter" class="text-red-500 text-xs mt-1">{{ errors.coverLetter }}</p>
    </div>

    <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <span v-if="isSubmitting">Submitting...</span>
        <span v-else>Submit Application</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const props = defineProps<{
  jobId: string | number;
}>();

const emit = defineEmits<{
  (e: 'submit', data: typeof form): void;
  (e: 'cancel'): void;
}>();

const isSubmitting = ref(false);

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  salary: '',
  coverLetter: ''
});

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  salary: '',
  coverLetter: ''
});

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => (errors[key as keyof typeof errors] = ''));

  if (!form.fullName.trim()) { errors.fullName = 'Full name is required'; isValid = false; }
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Please provide a valid email'; isValid = false; }
  if (!form.phone.trim()) { errors.phone = 'Phone number is required'; isValid = false; }
  if (!form.location.trim()) { errors.location = 'Location is required'; isValid = false; }
  if (!form.salary.trim()) { errors.salary = 'Please define your salary expectations'; isValid = false; }
  if (!form.coverLetter.trim() || form.coverLetter.length < 20) { errors.coverLetter = 'Cover letter must be at least 20 characters'; isValid = false; }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  try {
    // Emit the payload data up to your parent page context
    emit('submit', { ...form });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
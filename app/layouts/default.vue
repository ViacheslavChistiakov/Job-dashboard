<script setup lang="ts">
import TopBar from '~/components/layout/TopBar.vue';

</script>

<template>
    <div class="flex w-full h-screen dark:bg-gray-900 text-white-900 dark:text-gray-100">
        <SideBar />
        <div class="flex flex-col w-full min-h-screen bg-grey-50">
            <TopBar />
            <main class="flex-1 w-full  p-6">
                <slot />    
            </main>
        </div>
    </div>
</template>
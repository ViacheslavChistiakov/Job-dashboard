<script setup lang="ts">
import TopBar from '~/components/layout/TopBar.vue';

</script>

<template>
    <div class="flex h-screen">
        <SideBar />
        <div class="flex flex-row min-h-screen bg-grey-50">
            <TopBar />
            <main class="flex-1 bg-gray-50 p-6">
                <slot />    
            </main>
        </div>
    </div>
</template>
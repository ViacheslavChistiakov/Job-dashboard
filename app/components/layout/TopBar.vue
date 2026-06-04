<template>
  <div class="bg-white p-4 shadow-md">
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
          type="text"
          placeholder="Search jobs..."
          class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

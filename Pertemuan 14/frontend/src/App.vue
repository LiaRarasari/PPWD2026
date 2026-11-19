<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-700 text-white shadow">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink to="/" class="text-xl font-bold tracking-wide">
          Sistem Inventaris
        </RouterLink>
        <RouterLink to="/" class="text-sm hover:underline">
          Daftar Barang
        </RouterLink>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
<template>
    <div class="flex flex-col h-screen">
      <!-- Cabeçalho -->
      <header class="bg-blue-700 shadow-2xl p-4">
        <h1 class="text-center text-white text-2xl font-bold">Dashboard Trello</h1>
      </header>
      
      <!-- Corpo da tela -->
      <div class="flex-1 bg-blue-500 overflow-auto p-4">
        <Cards />
      </div>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable */
  import Cards from '@/components/CardsTrello.vue';
  </script>
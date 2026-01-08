<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow: hidden;
}
</style>

<script setup lang="ts">
declare global {
  const __REACT_URL__: string
}

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const reactUrl = __REACT_URL__
const iframeSrc = ref(reactUrl)
</script>

<template>
  <div>
    <button @click="router.push('/profile/123')">Go to React Profile</button>
    <iframe :src="iframeSrc" :key="iframeSrc" width="100%" height="500" frameborder="0"></iframe>
  </div>
</template>

<style scoped></style>

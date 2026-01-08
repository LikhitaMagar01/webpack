<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isDev = import.meta.env.VITE_IS_DEV ? import.meta.env.VITE_IS_DEV === 'true' : import.meta.env.DEV;
const reactUrl = __REACT_URL__
const iframeSrc = ref(reactUrl)
</script>

<template>
  <div>
    <button @click="router.push('/profile/123')">Go to React Profile</button>
    <iframe v-if="isDev" :src="iframeSrc" style="width: 100%; height: 100%; border: none"></iframe>
    <div v-else id="react-app" style="width: 100%; height: 100%; border: none"></div>
  </div>
</template>

<style scoped></style>

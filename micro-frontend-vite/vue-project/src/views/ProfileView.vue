<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDev = import.meta.env.VITE_IS_DEV ? import.meta.env.VITE_IS_DEV === 'true' : import.meta.env.DEV;
const profileId = computed(() => route.params.profileId as string);
const reactUrl = computed(() => `${__REACT_URL__}/profile/${profileId.value}`);

</script>

<template>
  <div>
    <div>
      <iframe v-if="isDev" :src="reactUrl" style="width: 100%; height: 100%; border: none;"></iframe>
      <div v-else id="react-app" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<style scoped></style>

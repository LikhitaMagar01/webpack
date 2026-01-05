<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const reactUrl = __REACT_URL__
const iframeSrc = ref(reactUrl)

onMounted(() => {
  const profileId = route.params.profileId as string;
  if (profileId) {
    iframeSrc.value = reactUrl + '/profile/' + profileId;
  }
})
</script>

<template>
  <div>
    <iframe :src="iframeSrc" width="100%" height="500" frameborder="0"></iframe>
  </div>
</template>

<style scoped></style>

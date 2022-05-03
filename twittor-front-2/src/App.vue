<script setup lang="ts">
import { useAuthStore } from '@/store/auth';

useAuthStore().initOnLoad();
</script>

<template>
  <router-view/>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html, body, #app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $primary-2;
}
</style>

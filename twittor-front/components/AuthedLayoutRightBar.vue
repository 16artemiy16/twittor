<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class AuthedLayoutRightBar extends Vue {

}
</script>

<template>
  <div class="sidebar">
    RIGHT sidebar
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 30%;
}
</style>

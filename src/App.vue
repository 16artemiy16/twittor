<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LayoutLeftBar from '@/components/LayoutLeftBar.vue';

@Component({
  components: {
    LayoutLeftBar,
  },
})
export default class App extends Vue {}
</script>

<template>
  <LayoutLeftBar />
</template>

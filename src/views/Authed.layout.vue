<script lang="ts">
import Component from 'vue-class-component';
import LayoutLeftBar from '@/components/LayoutLeftBar.vue';
import Vue from 'vue';

@Component({
  components: {
    LayoutLeftBar,
  },
})
export default class AuthedLayout extends Vue {}
</script>

<template>
  <div class="logged">
    <LayoutLeftBar/>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<style scoped lang="scss">
.logged {
  display: flex;
}

.content {
  flex: 1;
}
</style>

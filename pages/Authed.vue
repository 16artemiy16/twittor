<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutRightBar from '~/components/LayoutRightBar.vue';
import LayoutLeftBar from '@/components/LayoutLeftBar.vue';


@Component({
  components: {
    LayoutLeftBar,
    LayoutRightBar,
  },
})
export default class AuthedLayout extends Vue {}
</script>

<template>
  <div class="logged">
    <LayoutLeftBar/>
    <main class="content">
      <nuxt-child></nuxt-child>
    </main>
    <LayoutRightBar/>
  </div>
</template>

<style scoped lang="scss">
.logged {
  display: flex;
}

.content {
  flex: 1;
  border-right: 1px solid $grey;
  border-left: 1px solid $grey;
}
</style>

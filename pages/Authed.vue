<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import AuthedLayoutLeftBar from '~/components/AuthedLayoutLeftBar.vue';
import AuthedLayoutRightBar from '~/components/AuthedLayoutRightBar.vue';

@Component({
  components: {
    AuthedLayoutLeftBar,
    AuthedLayoutRightBar,
  },
})
export default class AuthedLayout extends Vue {}
</script>

<template>
  <v-app>
    <div class="logged" data-app>
      <AuthedLayoutLeftBar />
      <main class="content">
        <nuxt-child></nuxt-child>
      </main>
      <AuthedLayoutRightBar />
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.logged {
  display: flex;
  height: 100vh;
}

.content {
  overflow: scroll;
  flex: 1;
  border-right: 1px solid $grey;
  border-left: 1px solid $grey;
}
</style>

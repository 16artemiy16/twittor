<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { computed } from '~/store/profile/sandbox';

@Component
export default class ProfileDescriptionSection extends Vue {

}
</script>

<template>
  <header>
    <div class="py-2 px-4">
      <v-layout>
        <h2 class="login paint">&nbsp;</h2>
      </v-layout>

      <div class="mt-1 paint" style="width: 60px">&nbsp;</div>
    </div>

    <div class="header-image paint"></div>

    <div class="description">
      <v-layout>
        <div class="img rounded-circle ml-6 paint"></div>
        <v-layout></v-layout>
        <div class="pa-4">
          <v-btn
            class="mr-6"
            fab
            small
            disabled
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <v-btn rounded disabled style="width: 95px"></v-btn>
        </div>
      </v-layout>
      <div class="description__detailed pa-4">
        <h2 class="paint mb-1" style="width: 140px;">&nbsp;</h2>
        <div class="login paint">&nbsp;</div>
        <div class="description__about my-4 mx-0">
          <p class="mb-2 paint w-100">&nbsp;</p>
          <p class="mb-2 paint w-100">&nbsp;</p>
          <p class="mb-2 paint w-100">&nbsp;</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

header {
  user-select: none;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }
}
.profile-img {
  height: 200px;
}
.header-image {
  background: lightgrey;
  height: 200px;
}
.img {
  position: relative;
  width: 130px;
  height: 130px;
  top: -65px;
}
.description  {
  &__detailed {
    margin-top: -65px;
  }
}
.login {
  width: 270px;
}
.paint {
  background: $skeleton;
}
</style>

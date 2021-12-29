<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class TweetItemSkeleton extends Vue {}
</script>

<template>
  <article class="tweet skeleton d-flex pa-4 pos-relative">
    <div class="tweet__left">
      <div class="user-img rounded-circle"></div>
    </div>
    <div class="tweet__right flex-grow-1 flex-column">
      <div class="tweet__info mb-2">
        &nbsp;
      </div>
      <div class="tweet__body">
        <p class="mb-1">&nbsp</p>
        <p class="mb-1">&nbsp</p>
      </div>
      <div class="tweet__actions d-flex justify-space-between">
        <span class="skeleton-action pa-4 rounded-lg mt-1" v-for="i in 4"></span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-action {
  background: $skeleton;
}
.tweet {
  cursor: pointer;
  width: 100%;

  &.skeleton {
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
    .user-img {
      width: 35px;
      height: 35px;
      background: $skeleton;
    }
    .tweet__info {
      width: 300px;
      background: $skeleton;
    }
    .tweet__body {
      p {
        background: $skeleton;
      }
    }
  }

  &:hover {
    background: $background-hover-pale;
  }

  &__left {
    flex-basis: 50px;
  }

  &__actions {
    padding-right: 5rem;
  }
}
</style>

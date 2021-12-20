<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class TweetItemSkeleton extends Vue {}
</script>

<template>
  <article class="tweet skeleton">
    <div class="tweet__left">
      <div class="user-img"></div>
    </div>
    <div class="tweet__right">
      <div class="tweet__info">
        <template>&nbsp;</template>
      </div>
      <div class="tweet__body">
        <template>
          <p>&nbsp</p>
          <p>&nbsp</p>
        </template>
      </div>
      <div class="tweet__actions">
        <template>
          <span class="skeleton-action" v-for="i in 4"></span>
        </template>
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
  padding: 1rem;
  border-radius: 20%;
  background: $skeleton;
  margin-top: .25rem;
}
.tweet {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  position: relative;

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
        &:not(:last-child) {
          margin-bottom: 0.25rem;
        }
      }
    }
  }

  &:hover {
    background: $background-hover-pale;
  }

  &__left {
    flex-basis: 50px;

    .user-img {
      border-radius: 50%;
    }
  }

  &__info {
    margin-bottom: .5rem;

    > * {
      margin-right: .5rem;
    }
  }

  &__right {
    flex-direction: column;
    flex: 1;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    padding-right: 5rem;
  }
}
</style>

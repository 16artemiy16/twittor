<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TweetBtn from '~/components/TweetBtn.vue';

@Component({
  components: {
    TweetBtn,
  },
})
export default class AuthedLayoutLeftBar extends Vue {}
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <nav class="sidebar__nav">
        <NuxtLink to="/authed/home" class="sidebar__nav-item">
          <v-icon large arial-label="Home page">
            mdi-home
          </v-icon>
          <span class="sidebar__nav-item-text">Home</span>
        </NuxtLink>
        <NuxtLink to="/authed/explore" class="sidebar__nav-item">
          <v-icon large arial-label="Explore page">
            mdi-pound
          </v-icon>
          <span class="sidebar__nav-item-text">Explore</span>
        </NuxtLink>
        <NuxtLink to="/authed/profile/john.snow" class="sidebar__nav-item">
          <v-icon large arial-label="Profile page">
            mdi-account
          </v-icon>
          <span class="sidebar__nav-item-text">Profile</span>
        </NuxtLink>
      </nav>
      <TweetBtn />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 3rem;

  .wrapper {
    width: 230px;
  }

  &__tweet {
    width: 100%;
    margin-top: 1rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .nuxt-link-active {
      i {
        color: black;
      }
      span {
        text-shadow: 0 0 .75px black;
      }
    }
  }

  &__nav-item {
    display: flex;
    align-items: center;
    padding: .5rem;
    cursor: pointer;
    border-radius: 9999px;

    &:hover {
      background: $grey;
    }
  }

  &__nav-item-text {
    margin-left: 2rem;
    margin-right: 0.25rem; // Due to the icon (left) and text (right) border indents are not visually equal
    font-size: 1.5rem;
  }
}
</style>

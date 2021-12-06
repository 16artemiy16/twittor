<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VIcon } from 'vuetify/lib';

@Component({
  components: {
    VIcon,
  },
})
export default class LayoutLeftBar extends Vue {}
</script>

<template>
  <div class="sidebar">
    <nav class="sidebar__nav">
      <router-link :to="{ name: 'home' }" class="sidebar__nav-item">
        <v-icon large arial-label="Home page">
          mdi-home
        </v-icon>
        <span class="sidebar__nav-item-text">Home</span>
      </router-link>
      <router-link :to="{ name: 'explore' }" class="sidebar__nav-item">
        <v-icon large arial-label="Home page">
          mdi-pound
        </v-icon>
        <span class="sidebar__nav-item-text">Explore</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/colors.scss';

.sidebar {
  height: 100vh;
  border-right: 1px solid $grey;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 3rem;

  &__nav {
    display: flex;
    flex-direction: column;
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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TweetBtn from '~/components/TweetBtn.vue';
import { UserJWTI } from '~/interfaces/user-jwt.interface';
import { computed } from '~/store/home/sandbox';
import { actions as authActions, computed as  authComputed } from '~/store/auth/sandbox';

@Component({
  components: {
    AppUserImg: () => import('~/components/app/AppUserImg.vue' /* webpackChunkName: "AppUserImg" */),
    TweetBtn,
  },
  computed: {
    isTweetSending: computed.isTweetSending,
    user: authComputed.user,
  },
  methods: {
    logOut: authActions.logOut,
  }
} as any)
export default class AuthedLayoutLeftBar extends Vue {
  user!: UserJWTI;
  isTweetSending!: boolean;
  logOut!: Function;


  get profileLink(): string {
    return `/authed/profile/${this.user.login}`;
  }

  handleLogOut() {
    this.logOut();
    this.$router.push({ path: '/guest/sign-in' })
  }
}
</script>

<template>
  <div class="sidebar d-flex flex-column align-end pa-12">
    <div class="wrapper  d-flex flex-column ">
      <nav class="sidebar__nav mb-4">
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
        <NuxtLink :to="profileLink" class="sidebar__nav-item">
          <v-icon large arial-label="Profile page">
            mdi-account
          </v-icon>
          <span class="sidebar__nav-item-text">Profile</span>
        </NuxtLink>
      </nav>
      <TweetBtn :disabled="isTweetSending" />
      <v-menu
        top
        offset-y
        min-width="310"
        max-width="310"
      >
        <template v-slot:activator="{ on, attrs }">
          <div
            class="user-card mt-auto d-flex align-center rounded-pill pa-2 w-100"
            v-on="on"
            v-bind="attrs"
          >
            <AppUserImg :user="user" size="40" class="flex-shrink-0" />
            <div class="flex-grow-1 ml-2 d-flex flex-column">
              <div class="user-menu__name font-weight-bold">{{ user.fullname }}</div>
              <div class="user-card__login">@{{ user.login }}</div>
            </div>
            <v-icon>mdi-dots-horizontal</v-icon>
          </div>
        </template>
        <div class="user-menu d-flex flex-column pa-4">
          <div class="d-flex align-center">
            <AppUserImg :user="user" size="40" class="flex-shrink-0" />
            <div class="ml-3 d-flex flex-column">
              <div class="font-weight-bold">{{ user.fullname }}</div>
              <div>@{{ user.login }}</div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click="handleLogOut()">Log out</v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100vh;
  width: 30%;

  .wrapper {
    width: 230px;
    height: 100%;
  }

  &__nav {
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

  .user-card {
    cursor: pointer;

    &:hover {
      background: $background-hover-pale;
    }

    &__login, &__name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.v-list-item {
  &:hover {
    background: $background-hover-pale;
    cursor: pointer;
  }
}

.v-menu__content {
  background: white;
}
</style>

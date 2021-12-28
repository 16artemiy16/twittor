<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Profile extends Vue {
  user = {
    name: 'John Snow',
    isVerified: true,
    totalTweets: 415,
    headerImg: null,
    img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg',
    login: '@john.snow',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    followingCount: 250,
    followersCount: 14,
  };
}
</script>

<template>
  <header>
    <div class="top-text">
      <v-layout>
        <h2>{{ user.name }}</h2>
        <v-icon class="verified" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
      </v-layout>

      <div>{{ user.totalTweets }} Tweets</div>
    </div>

    <div class="header-image"></div>

    <div class="description">
      <v-layout>
        <div class="img" :style="{ backgroundImage: 'url(' + user.img + ')' }"></div>
        <v-layout></v-layout>
        <div class="description__actions">
          <v-btn
            class="mx-2"
            fab
            small
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <v-btn rounded>Follow</v-btn>
        </div>
      </v-layout>
      <div class="description__detailed">
        <v-layout>
          <h2>{{ user.name }}</h2>
          <v-icon class="verified" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
        </v-layout>
        <div class="login">{{ user.login }}</div>
        <div class="description__about">{{ user.about }}</div>
      </div>
    </div>
    <v-layout class="description__numbers">
      <div><b>{{ user.followingCount }}</b> <span>Following</span></div>
      <div><b>{{ user.followersCount }}</b> <span>Followers</span></div>
    </v-layout>
  </header>
</template>

<style scoped lang="scss">
.profile-img {
  height: 200px;
}
.top-text {
  padding: .5rem 1rem;
}
.verified {
    margin-left: .25rem;
}
.header-image {
  background: lightgrey;
  height: 200px;
}
.img {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 130px;
  height: 130px;
  top: -65px;
  border-radius: 50%;
  margin-left: 1.5rem;
}
.description  {
  &__actions {
    padding: 1rem;

    button:not(:first-child) {
      margin-left: 1.5rem;
    }
  }

  &__detailed {
    padding: 1rem;
    margin-top: -65px;
  }

  &__about {
    margin: 1rem 0;
  }

  &__numbers {
    padding: 1rem;

    div:not(:first-child) {
      margin-left: 1rem;
    }

    div span {
      color: $middle-grey;
    }
  }
}
.login {
  color: $middle-grey;
}
</style>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { computed as profileComputed } from '~/store/profile/sandbox';
import { computed as authComputed } from '~/store/auth/sandbox';

import { UserProfileI } from '~/interfaces/user-profile.interface';
import { UserJWTI } from '~/interfaces/user-jwt.interface';

@Component({
  components: {
    AppUserImg: () => import('~/components/app/AppUserImg.vue' /* webpackChunkName: "AppUserImg" */),
  },
  computed: {
    user: profileComputed.profileInfo,
    currentUser: authComputed.user,
  }
})
export default class ProfileDescriptionSection extends Vue {
  user: UserProfileI | undefined;
  currentUser!: UserJWTI;


  get isProfileMine(): boolean {
    return this.currentUser.id === this.user?.id;
  }
}
</script>

<template>
  <header v-if="user">
    <div class="py-2 px-4">
      <v-layout>
        <h2>{{ user.fullname }}</h2>
        <v-icon class="verified ml-1" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
      </v-layout>

      <div>{{ user.stats.tweets }} Tweets</div>
    </div>

    <div class="header-image"></div>

    <div class="description">
      <v-layout>
        <AppUserImg class="img ml-6" :user="user" size="130"/>
        <v-layout></v-layout>
        <div v-if="!isProfileMine" class="pa-4">
          <v-btn
            class="mr-6"
            fab
            small
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <v-btn rounded>Follow</v-btn>
        </div>
        <div v-else class="pa-4">
          <v-btn rounded>Edit profile</v-btn>
        </div>
      </v-layout>
      <div class="description__detailed pa-4">
        <v-layout>
          <h2>{{ user.fullname }}</h2>
          <v-icon class="verified" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
        </v-layout>
        <div class="login">@{{ user.login }}</div>
        <div class="description__about my-4 mx-0">{{ user.about }}</div>
      </div>
    </div>
    <v-layout class="description__numbers pa-4">
      <div class="mr-4"><b>{{ user.stats.followingCount }}</b> <span>Following</span></div>
      <div><b>{{ user.stats.followersCount }}</b> <span>Followers</span></div>
    </v-layout>
  </header>
</template>

<style scoped lang="scss">
.profile-img {
  height: 200px;
}
.header-image {
  background: lightgrey;
  height: 200px;
}
.img {
  position: relative;
  top: -65px;
}
.description  {
  &__detailed {
    margin-top: -65px;
  }

  &__numbers {
    div span {
      color: $middle-grey;
    }
  }
}
.login {
  color: $middle-grey;
}
</style>

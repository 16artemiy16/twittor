<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { computed } from '~/store/profile/sandbox';

@Component({
  computed: {
    user: computed.profileInfo
  }
})
export default class ProfileDescriptionSection extends Vue {

}
</script>

<template>
  <header v-if="user">
    <div class="py-2 px-4">
      <v-layout>
        <h2>{{ user.name }}</h2>
        <v-icon class="verified ml-1" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
      </v-layout>

      <div>{{ user.totalTweets }} Tweets</div>
    </div>

    <div class="header-image"></div>

    <div class="description">
      <v-layout>
        <div class="img rounded-circle ml-6" :style="{ backgroundImage: 'url(' + user.img + ')' }"></div>
        <v-layout></v-layout>
        <div class="pa-4">
          <v-btn
            class="mr-6"
            fab
            small
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <v-btn rounded>Follow</v-btn>
        </div>
      </v-layout>
      <div class="description__detailed pa-4">
        <v-layout>
          <h2>{{ user.name }}</h2>
          <v-icon class="verified" v-if="user.isVerified">mdi-checkbox-marked-circle-outline</v-icon>
        </v-layout>
        <div class="login">{{ user.login }}</div>
        <div class="description__about my-4 mx-0">{{ user.about }}</div>
      </div>
    </div>
    <v-layout class="description__numbers pa-4">
      <div class="mr-4"><b>{{ user.followingCount }}</b> <span>Following</span></div>
      <div><b>{{ user.followersCount }}</b> <span>Followers</span></div>
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 130px;
  height: 130px;
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

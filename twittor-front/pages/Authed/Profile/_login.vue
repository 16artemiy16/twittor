<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import { actions as profileActions, computed as profileComputed } from '~/store/profile/sandbox';
import { UserJWTI } from '~/interfaces/user-jwt.interface';

@Component<any>({
  computed: {
    isLoadingProfile: profileComputed.isLoadingProfileInfo,
    isLoadingTweets: profileComputed.isLoadingTweets,
    tweets: profileComputed.tweets,
  },
  methods: {
    initProfile: profileActions.initProfile,
    toggleTweetLike: profileActions.toggleTweetLike,
  },
  components: {
    ProfileDescriptionSection: () => import('~/components/Profile/ProfileDescriptionSection.vue' /* webpackChunkName: "ProfileDescriptionSection" */),
    ProfileDescriptionSectionSkeleton: () => import('~/components/Profile/ProfileDescriptionSectionSkeleton.vue' /* webpackChunkName: "ProfileDescriptionSectionSkeleton" */),
    TweetItemSkeleton: () => import('~/components/TweetItem/TweetItemSkeleton.vue' /* webpackChunkName: "TweetItemSkeleton" */),
    TweetItem: () => import('~/components/TweetItem/TweetItem.vue' /* webpackChunkName: "TweetItem" */),
  },
})
export default class Profile extends Vue {
  currentUser!: UserJWTI;
  initProfile!: Function;

  @Watch('$route.params.login', { immediate: true })
  onLoginChange(login: string) {
    if (!login) {
      this.$router.push({ path: `/authed/profile/${this.currentUser.login}` });
      return;
    }

    this.initProfile(login);
  }

  removeTweet(id: number) {
    this.$tweetsService.removeTweet(id);
  }
}
</script>

<template>
  <div>
    <ProfileDescriptionSection v-if="!isLoadingProfile" />
    <ProfileDescriptionSectionSkeleton v-else />
    <section class="explore__posts py-2">
      <template v-if="isLoadingTweets">
        <TweetItemSkeleton v-for="i in 4" :key="i" />
      </template>
      <template v-else>
        <TweetItem
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          @toggle-like="({ id }) => toggleTweetLike(id)"
          @remove-tweet="({ id }) => removeTweet(id)"
        />
      </template>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>

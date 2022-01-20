<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { actions, computed } from '~/store/profile/sandbox';
import { Watch } from 'vue-property-decorator';

@Component<any>({
  computed: {
    isLoadingProfile: computed.isLoadingProfileInfo,
    isLoadingTweets: computed.isLoadingTweets,
    tweets: computed.tweets,
  },
  methods: {
    initProfile: actions.initProfile,
    toggleTweetLike: actions.toggleTweetLike,
  },
  components: {
    ProfileDescriptionSection: () => import('~/components/Profile/ProfileDescriptionSection.vue' /* webpackChunkName: "ProfileDescriptionSection" */),
    ProfileDescriptionSectionSkeleton: () => import('~/components/Profile/ProfileDescriptionSectionSkeleton.vue' /* webpackChunkName: "ProfileDescriptionSectionSkeleton" */),
    TweetItemSkeleton: () => import('~/components/TweetItem/TweetItemSkeleton.vue' /* webpackChunkName: "TweetItemSkeleton" */),
    TweetItem: () => import('~/components/TweetItem/TweetItem.vue' /* webpackChunkName: "TweetItem" */),
  },
})
export default class Profile extends Vue {
  initProfile!: Function;

  @Watch('$route.params.login', { immediate: true })
  onLoginChange(login: string) {
    if (!login) {
      const myLogin = this.$authService.user()?.login as string;
      this.$router.push({ path: `/authed/profile/${myLogin}` });
      return;
    }

    this.initProfile(login);
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
        />
      </template>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>

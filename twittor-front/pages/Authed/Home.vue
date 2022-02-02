<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { computed, actions } from '~/store/home/sandbox';
import { TweetI } from '~/interfaces/tweet.interface';

@Component<any>({
  components: {
    TweetForm: () => import('~/components/TweetForm.vue' /* webpackChunkName: "TweetForm" */),
    TweetItemSkeleton: () => import('~/components/TweetItem/TweetItemSkeleton.vue' /* webpackChunkName: "TweetItemSkeleton" */),
    TweetItem: () => import('~/components/TweetItem/TweetItem.vue' /* webpackChunkName: "TweetItem" */),
  },
  computed: {
    tweets: computed.tweets,
    isLoadingTweets: computed.isLoadingTweets,
  },
  methods: {
    fetchTweets: actions.fetchTweets,
    toggleTweetLike: actions.toggleTweetLike
  }
})
export default class Home extends Vue {
  fetchTweets!: Function;
  toggleTweetLike!: Function;
  tweets!: TweetI[];
  tweetModel: { text: string } = { text: '' };

  created() {
    this.fetchTweets();
  }

  async postTweet() {
    try {
      await this.$tweetsService.postTweet({body: this.tweetModel.text});
      this.tweetModel.text = '';
    } catch (e) {}
  }
}
</script>

<template>
  <div class="home">
    <header class="pa-4">
      <h2>Home</h2>
    </header>
    <div class="new-tweet pa-4">
      <TweetForm v-model="tweetModel" @on-send="postTweet()"/>
    </div>
    <section class="home__posts py-2">
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
.header {
  padding: 1rem;
}
.new-tweet {
  border-bottom: 1px $grey solid;
}
</style>

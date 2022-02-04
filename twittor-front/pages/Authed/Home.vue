<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { computed, actions } from '~/store/home/sandbox';
import { TweetI } from '~/interfaces/tweet.interface';
import { CreateTweetDto } from '~/dtos/create-tweet.dto';
import { Watch } from 'vue-property-decorator';

@Component<any>({
  components: {
    TweetForm: () => import('~/components/TweetForm.vue' /* webpackChunkName: "TweetForm" */),
    TweetItemSkeleton: () => import('~/components/TweetItem/TweetItemSkeleton.vue' /* webpackChunkName: "TweetItemSkeleton" */),
    TweetItem: () => import('~/components/TweetItem/TweetItem.vue' /* webpackChunkName: "TweetItem" */),
  },
  computed: {
    tweets: computed.tweets,
    isLoadingTweets: computed.isLoadingTweets,
    isTweetSending: computed.isTweetSending,
    lastCreatedTweet: computed.lastCreatedTweet,
  },
  methods: {
    fetchTweets: actions.fetchTweets,
    toggleTweetLike: actions.toggleTweetLike,
    createTweet: actions.createTweet
  }
})
export default class Home extends Vue {
  fetchTweets!: Function;
  toggleTweetLike!: Function;
  createTweet!: Function;

  tweets!: TweetI[];
  isTweetSending!: boolean;

  tweetModel: CreateTweetDto = { body: '' };

  @Watch('lastCreatedTweet')
  onTweetCreated() {
    this.tweetModel.body = '';
  }

  created() {
    this.fetchTweets();
  }

  async postTweet() {
    this.createTweet(this.tweetModel);
  }
}
</script>

<template>
  <div class="home">
    <header class="pa-4">
      <h2>Home</h2>
    </header>
    <div class="new-tweet pa-4">
      <TweetForm v-model="tweetModel" @on-send="postTweet()" :disabled="isTweetSending"/>
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

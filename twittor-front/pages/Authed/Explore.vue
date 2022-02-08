<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { computed, actions } from '~/store/explore/explore.sandbox';
import TweetItemSkeleton from '~/components/TweetItem/TweetItemSkeleton.vue';

@Component<any>({
  components: {
    ContentCard: () => import('~/components/ContentCard.vue' /* webpackChunkName: "ContentCard" */),
    TweetItem: () => import('~/components/TweetItem/TweetItem.vue' /* webpackChunkName: "TweetItem" */),
    TweetItemSkeleton,
  },
  computed: {
    trends: computed.trends,
    tweets: computed.tweets,
    isLoadingTweets: computed.isLoadingTweets,
    isLoadingTrends: computed.isLoadingTrends,
  },
  methods: {
    fetchTrends: actions.fetchTrends,
    fetchTweets: actions.fetchTweets,
    toggleTweetLike: actions.toggleTweetLike,
  },
})
export default class Explore extends Vue {
  fetchTrends!: Function;
  fetchTweets!: Function;

  created() {
    this.fetchTrends();
    this.fetchTweets();
  }

  removeTweet(id: number) {
    this.$tweetsService.removeTweet(id);
  }

  reportNotInteresting(id: number) {
  }

  reportSpam(id: number) {
  }
}
</script>

<template>
  <div class="explore pos-relative">
    <header class="explore__header py-2 px-4">
      <v-text-field
        hide-details
        outlined
        clearable
        rounded
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Twittor"
      ></v-text-field>
    </header>
    <section class="explore__trends py-2 pos-relative">
      <h1 class="py-2 px-4">Trends for you</h1>
      <v-progress-circular
        v-if="isLoadingTrends"
        indeterminate
        color="primary"
        class="loader"
      ></v-progress-circular>
      <template v-else>
        <ContentCard
          v-for="trend in trends"
          :key="trend.id"
          :main-text="trend.title"
          :actions="[
          { icon: 'mdi-emoticon-angry-outline', text: 'It \'s not interesting', onClick: () => reportNotInteresting(trend.id) },
          { icon: 'mdi-alert-circle-outline', text: 'Report Spam', onClick: () => reportSpam(trend.id) },
        ]"
          top-text="Trending"
          bottom-text="3,504 Twits"
        />
        <ContentCard
          class="link"
          main-text="Show more"
        />
      </template>
    </section>
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
.loader {
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 50%;
  right: 50%;
}
.link {
  color: $link;
}
.explore {
  &__header, &__trends {
    border-bottom: 1px $grey solid;
  }

  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
  }

  &__trends {
    min-height: 400px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContentCard from '~/components/ContentCard.vue';
import TweetItem from '~/components/TweetItem.vue';
import { computed, actions } from '~/store/explore/explore.sandbox';

@Component({
  components: {
    ContentCard,
    TweetItem,
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
  },
})
export default class Explore extends Vue {
  created() {
    this.fetchTrends();
    this.fetchTweets()
  }

  reportNotInteresting(id: string) {
  }

  reportSpam(id: string) {
  }
}
</script>

<template>
  <div class="explore">
    <header class="explore__section explore__header">
      <v-text-field
        hide-details
        outlined
        clearable
        rounded
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Twittor"
      ></v-text-field>
    </header>
    <section class="explore__section explore__trends">
      <h1>Trends for you</h1>
      <v-progress-circular
        v-if="isLoadingTrends"
        indeterminate
        color="primary"
        class="loader"
      ></v-progress-circular>
      <template v-else>
        <ContentCard
          class="trend"
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
    <section class="explore__section explore__posts">
      <template v-if="isLoadingTweets">
        <TweetItem v-for="i in 4" :skeleton="true" />
      </template>
      <template v-else>
        <TweetItem v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
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
  position: relative;

  &__header, &__trends {
    border-bottom: 1px $grey solid;
  }

  &__section {
    padding: .5rem 0;
    position: relative;
  }

  &__header {
    padding: .5rem 1rem;
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
  }

  &__trends {
    min-height: 400px;
    h1 {
      padding: .5em 1rem;
    }
  }
}
</style>

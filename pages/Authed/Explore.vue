<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContentCard from '~/components/ContentCard.vue';
import TweetItem from '~/components/TweetItem.vue';

@Component({
  components: {
    ContentCard,
    TweetItem,
  }
})
export default class Explore extends Vue {
  trends = [
    { id: '1', title: 'First trend' },
    { id: '2', title: 'Second trend' },
    { id: '3', title: 'Third trend' },
  ];

  tweets = [
    {
      id: '1',
      body: 'Hello!!! This is my very first Tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '2',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '3',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '4',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '5',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '6',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '7',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '8',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
    {
      id: '71',
      body: 'Hi there! `one more tweet!',
      user: { name: 'John Snow', login: '@john-snow', img: 'https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg' }
    },
  ];

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
    </section>
    <section class="explore__section explore__posts">
      <TweetItem v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </section>
  </div>
</template>

<style scoped lang="scss">
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
  }

  &__header {
    padding: .5rem 1rem;
    position: sticky;
    top: 0;
    z-index: 1;
    background: white;
  }

  &__trends {
    h1 {
      padding: .5em 1rem;
    }
  }
}
</style>

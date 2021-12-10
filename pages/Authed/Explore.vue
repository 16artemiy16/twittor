<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContentCard from '~/components/ContentCard.vue';

@Component({
  components: {
    ContentCard
  }
})
export default class Explore extends Vue {
  trends = [
    { id: '1', title: 'First trend' },
    { id: '2', title: 'Second trend' },
    { id: '3', title: 'Third trend' },
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
    <section class="explore__section explore__posts"></section>
  </div>
</template>

<style scoped lang="scss">
.link {
  color: $link;
}
.explore {
  &__header, &__trends {
    border-bottom: 1px $grey solid;
  }

  &__section {
    padding: .5rem 0;
  }

  &__header {
    padding: .5rem 1rem;
  }

  &__trends {
    h1, div {
      padding: .5em 1rem;
    }
  }
}
</style>

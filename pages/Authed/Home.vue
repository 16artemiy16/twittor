<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TweetForm from '~/components/TweetForm.vue';

@Component({
  components: {
    TweetForm: () => import('~/components/TweetForm.vue'),
  },
})
export default class Home extends Vue {
  tweetModel: { text: string } = { text: '' };
}
</script>

<template>
  <div class="home">
    <header class="header">
      <h2>Home</h2>
    </header>
    <div class="new-tweet">
      <TweetForm v-model="tweetModel" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 1rem;
}
.new-tweet {
  padding: 1rem;
  border-bottom: 1px $grey solid;
}
</style>

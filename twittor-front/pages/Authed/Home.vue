<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  components: {
    TweetForm: () => import('~/components/TweetForm.vue'),
  },
})
export default class Home extends Vue {
  tweetModel: { text: string } = { text: '' };

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

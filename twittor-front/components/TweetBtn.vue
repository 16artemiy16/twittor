<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  components: {
    TweetAddModal: () => import('~/components/TweetAddModal.vue' /* webpackChunkName: "TweetAddModal" */),
  },
  props: {
    disabled: { type: Boolean, default: false, }
  },
})
export default class TweetBtn extends Vue {
  disabled!: boolean;
  isOpened: boolean = false;

  async createTweet(model: { body: string }) {
    try {
      await this.$tweetsService.postTweet(model);
      this.$emit('closed', model);
      this.isOpened = false;
    } catch (e) {}
  }
}
</script>

<template>
  <v-dialog persistent max-width="600" v-model="isOpened">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        class="tweet-btn"
        rounded
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
      >
        Tweet
      </v-btn>
    </template>
    <TweetAddModal v-if="isOpened" @send="createTweet" @close="() => isOpened = false" />
  </v-dialog>

</template>

<style scoped lang="scss">
.tweet-btn {
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  components: {
    TweetForm: () => import('~/components/TweetForm.vue' /* webpackChunkName: "TweetForm" */),
  },
  props: {
    disabled: { type: Boolean, default: false, }
  },
})
export default class TweetBtn extends Vue {
  disabled!: boolean;
  isOpened: boolean = false;
  tweetModel: { body: string } = { body: '' };

  async close(withData: boolean) {
    this.isOpened = false;
    if (withData) {
      try {
        await this.$tweetsService.postTweet(this.tweetModel);
        this.tweetModel.body = '';
        this.$emit('closed', this.tweetModel);
      } catch(err) {}
      return;
    }
    this.$emit('closed');
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
    <v-card light class="modal" v-if="isOpened">
      <header class="modal__header">
        <v-btn icon text @click="close(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </header>
      <main class="modal__main">
        <TweetForm v-model="tweetModel" @on-send="close(true)"/>
      </main>
    </v-card>
  </v-dialog>

</template>

<style scoped lang="scss">
.tweet-btn {
  width: 100%;
}
.modal {
  &__header {
    border-bottom: 1px $grey solid;
  }

  &__main {
    padding: 1rem;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class TweetBtn extends Vue {
  readonly attachmentActions: string[] = [
    'mdi-panorama-variant-outline',
    'mdi-file-gif-box',
    'mdi-chart-box-outline',
  ];

  isOpened: boolean = false;
  tweet: string = '';

  get isTweetBtnDisabled(): boolean {
    return this.tweet.trim().length === 0;
  }

  close(withData: boolean) {
    this.isOpened = false;
    if (withData) {
      this.tweet = '';
      this.$emit('closed', this.tweet);
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
        class="tweet-btn"
        rounded
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
        @click="close"
      >
        Tweet
      </v-btn>
    </template>
    <v-card light class="modal">
      <header class="modal__header">
        <v-btn icon text @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </header>
      <main class="modal__main">
        <div class="modal__author">
          <img class="modal__author-img" width="50" height="50" src="https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg" />
        </div>
        <div class="modal__input">
          <v-textarea
            solo
            autofocus
            no-resize
            v-model="tweet"
            label="What's going on..."
          ></v-textarea>

          <div class="actions">
            <div class="actions__attachments">
              <v-btn text icon v-for="action in attachmentActions" :key="action">
                <v-icon>{{ action }}</v-icon>
              </v-btn>
            </div>
            <v-btn rounded @click="() => close(true)" :disabled="isTweetBtnDisabled">Tweet</v-btn>
          </div>
        </div>
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
    display: flex;
    padding: 1rem;
  }

  &__author {
    flex-basis: 50px;
    text-align: center;
    margin-right: 1rem;
  }

  &__input {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__author-img {
    border-radius: 50%;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

interface TweetModelI {
  text: string;
}

@Component({
  props: ['value'],
})
export default class TweetForm extends Vue {
  readonly attachmentActions: string[] = [
    'mdi-panorama-variant-outline',
    'mdi-file-gif-box',
    'mdi-chart-box-outline',
  ];

  model: TweetModelI = {
    text: '',
  };

  get isTweetBtnDisabled(): boolean {
    return this.model.text.trim().length === 0;
  }

  setText(e: string) {
    this.model.text = e;
    this.$emit('input', this.model);
  }
}
</script>

<template>
  <form class="tweet-form">
    <div class="tweet-form__author">
      <img class="tweet-form__author-img" width="50" height="50" src="https://www.pravmir.ru/wp-content/uploads/2011/02/pushkin.jpg" />
    </div>
    <div class="tweet-form__input">
      <v-textarea
        solo
        autofocus
        no-resize
        :value="value.text"
        @input="setText"
        label="What's going on..."
      ></v-textarea>

      <div class="actions">
        <div class="actions__attachments" v-once>
          <v-btn text icon v-for="action in attachmentActions" :key="action">
            <v-icon>{{ action }}</v-icon>
          </v-btn>
        </div>
        <v-btn rounded :disabled="isTweetBtnDisabled" @click="$emit('on-send')">Tweet</v-btn>
      </div>
    </div>
  </form>

</template>

<style scoped lang="scss">
.tweet-form {
  width: 100%;
  display: flex;

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

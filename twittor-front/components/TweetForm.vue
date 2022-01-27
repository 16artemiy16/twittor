<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

interface TweetModelI {
  text: string;
}

@Component({
  props: ['value'],
  components: {
    AppUserImg: () => import('~/components/app/AppUserImg.vue' /* webpackChunkName: "AppUserImg" */),
  }
})
export default class TweetForm extends Vue {
  readonly TEXT_MAX_SIZE = 280;
  readonly TEXT_CLOSE_TO_EXCESS = 20;

  readonly attachmentActions: string[] = [
    'mdi-panorama-variant-outline',
    'mdi-file-gif-box',
    'mdi-chart-box-outline',
  ];

  model: TweetModelI = {
    text: '',
  };

  get user() {
    return this.$authService.user();
  }

  get isTweetBtnDisabled(): boolean {
    return this.model.text.trim().length === 0 || this.textExcess > 0;
  }

  get textProgress(): number {
    return this.model.text.length * 100 / this.TEXT_MAX_SIZE;
  }

  get textExcess(): number {
    return this.model.text.length - this.TEXT_MAX_SIZE;
  }

  get isTextCloseToExcess(): boolean {
    return this.textExcess < 0 && Math.abs(this.textExcess) <= this.TEXT_CLOSE_TO_EXCESS;
  }

  get progressDisplay(): { text: string, color?: string } {
    if (this.textExcess > 0) {
      return { text: `${-this.textExcess}`, color: 'red' };
    }

    const leftToExcess = this.TEXT_MAX_SIZE - this.model.text.length;

    if (this.isTextCloseToExcess) {
      return { text: `${leftToExcess}`, color: '#ffcc00'};
    }

    if (leftToExcess === 0) {
      return { text: '0', color: '#E04B4BFF' };
    }

    return { text: '' };
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
      <AppUserImg size="50" :user="user" />
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
        <div class="actions__submit" :style="{ color: progressDisplay.color }">
          <v-progress-circular
            :width="textExcess <= 0 ? 2 : 0"
            :value="textProgress"
            :color="progressDisplay.color"
          >
            {{ progressDisplay.text }}
          </v-progress-circular>

          <v-divider vertical></v-divider>

          <v-btn rounded :disabled="isTweetBtnDisabled" @click="$emit('on-send')">Tweet</v-btn>
        </div>
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

  .actions {
    display: flex;
    justify-content: space-between;

    &__submit {
      display: flex;
      align-items: center;

      &> * {
        margin-left: .5rem;
        &:not(:last-child) {
          margin-right: .5rem;
        }
      }
    }
  }
}
</style>

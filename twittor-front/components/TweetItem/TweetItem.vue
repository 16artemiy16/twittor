<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Emit, Prop } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';
import { TweetI } from '~/interfaces/tweet.interface';
import { stringifyTimestampDiff } from '~/utils/date-diff.util';

interface ActionBottomI {
  icon: string;
  title: string;
  handler?: () => any;
  id?: string;
  text?: () => string;
}

@Component({
  components: {
    ContainerActionsMenu,
  },
})
export default class TweetItem extends Vue {
  @Prop({ type: Object, required: true })
  tweet!: TweetI;

  readonly moreActions = [
    { icon: 'mdi-account-plus', text: 'Follow this User' },
    { icon: 'mdi-flag-outline', text: 'Report this Tweet' },
  ];

  readonly footerActions: ActionBottomI[] = [
    { icon: 'mdi-message-reply', title: 'Reply' },
    { icon: 'mdi-repeat-variant', title: 'Repost' },
    {
      icon: 'mdi-heart-outline',
      title: 'Like',
      text: () => `${this.tweet.likes.total}`,
      id: 'like',
      handler: () => this.toggleLike(),
    },
    { icon: 'mdi-export-variant', title: 'Share' },
  ];

  get dateDiff(): string {
    return stringifyTimestampDiff(this.tweet.created);
  }

  @Emit('toggle-like')
  toggleLike() {
    const { id, likes } = this.tweet;
    return { id, isLike: !likes.isLikedByMe };
  }
}
</script>

<template>
  <ContainerActionsMenu :actions="moreActions">
    <article class="tweet d-flex pos-relative pa-4">
      <div class="tweet__left">
        <img class="user-img rounded-circle" :src="tweet.user.img" width="35" height="35">
      </div>
      <div class="flex-column flex-grow-1">
        <div class="tweet__info mb-2 d-flex">
          <template>
            <span class="user-name mr-2 font-weight-bold">{{ tweet.user.fullname }}</span>
            <span class="user-login mr-2">{{ tweet.user.login }}</span>
            <span class="posted-date">{{ dateDiff }}</span>
          </template>
        </div>
        <div class="tweet__body">
          {{ tweet.body }}
        </div>
        <div class="tweet__actions d-flex pr-16 justify-space-between">
          <template>
            <v-btn
              class="tweet__action"
              :class="{ tweet__action_active: action.id === 'like' && tweet.likes.isLikedByMe }"
              @click="action.handler && action.handler(tweet)"
              v-for="action in footerActions"
              :key="action.icon"
              text
              icon
            >
              <template>
                <v-icon>{{ action.icon }}</v-icon>
                {{ action.text && action.text(tweet)  }}
              </template>
            </v-btn>
          </template>
        </div>
      </div>
    </article>
  </ContainerActionsMenu>
</template>

<style scoped lang="scss">
.tweet {
  cursor: pointer;
  width: 100%;

  &:hover {
    background: $background-hover-pale;
  }

  &__left {
    flex-basis: 50px;
  }

  &__action {
    &_active {
      color: $like !important;
    }
  }
}
</style>

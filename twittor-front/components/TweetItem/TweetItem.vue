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

interface MoreActionI {
  icon: string;
  text: string;
  onClick?: () => void;
}

@Component({
  components: {
    ContainerActionsMenu,
    AppUserImg: () => import('~/components/app/AppUserImg.vue' /* webpackChunkName: "AppUserImg" */),
  },
})
export default class TweetItem extends Vue {
  @Prop({ type: Object, required: true })
  tweet!: TweetI;

  get moreActions(): MoreActionI[] {
    const actions: MoreActionI[] = [
      { icon: 'mdi-account-plus', text: 'Follow this User' },
      { icon: 'mdi-flag-outline', text: 'Report this Tweet' },
    ];
    // TODO: move user and tweet removing to store
    if (this.$authService.user()) {
      actions.push({
        icon: 'mdi-delete-outline',
        text: 'Remove',
        onClick: () => {
          this.$tweetsService.removeTweet(this.tweet.id);
        },
      })
    }
    return actions;
  }

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
        <AppUserImg :user="tweet.user" size="35" />
      </div>
      <div class="tweet__right flex-column flex-grow-1">
        <div class="tweet__info mb-2 d-flex">
          <template>
            <router-link
                :to="{ path: '/authed/profile', params: { login: tweet.user.login } }"
            >
              <span class="user-name mr-2 font-weight-bold">{{ tweet.user.fullname }}</span>
              <span class="user-login mr-2">@{{ tweet.user.login }}</span>
            </router-link>
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

  .user-name:hover {
    text-decoration: underline;
  }

  &:hover {
    background: $background-hover-pale;
  }

  &__left {
    min-width: 50px;
  }

  &__right {
    overflow: hidden;
    overflow-wrap: break-word;
    word-break: break-word;;
  }

  &__action {
    &_active {
      color: $like !important;
    }
  }
}
</style>

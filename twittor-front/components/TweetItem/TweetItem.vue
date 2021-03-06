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

  isTooltip: boolean = false;

  get moreActions(): MoreActionI[] {
    const actions: MoreActionI[] = [
      { icon: 'mdi-account-plus', text: 'Follow this User' },
      { icon: 'mdi-flag-outline', text: 'Report this Tweet' },
    ];
    // TODO: check if the user is the tweet owner
    actions.push({
      icon: 'mdi-delete-outline',
      text: 'Remove',
      onClick: () => this.removeTweet(),
    });
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

  toggleTooltip(flag: boolean): void {
      this.isTooltip = flag;
  }

  @Emit('toggle-like')
  toggleLike() {
    const { id, likes } = this.tweet;
    return { id, isLike: !likes.isLikedByMe };
  }

  @Emit('remove-tweet')
  removeTweet() {
    return { id: this.tweet.id };
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
            <NuxtLink
              :to="{ path: '/authed/profile/' + tweet.user.login }"
              style="position: relative"
              @mouseover.native="toggleTooltip(true)"
              @mouseleave.native="toggleTooltip(false)"
            >
              <span class="user-name mr-2 font-weight-bold">{{ tweet.user.fullname }}</span>
              <span class="user-login mr-2">@{{ tweet.user.login }}</span>
              <div v-if="isTooltip" class="tooltip d-flex flex-column">
                <AppUserImg :user="tweet.user" size="35" />
                {{ tweet.user.fullname }}
              </div>
            </NuxtLink>
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
.tooltip {
  position: absolute;
  background: white;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
  padding: 1rem;
  z-index: 2;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  &:before{
    content: ' ';
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }
}
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

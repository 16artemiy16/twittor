<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Emit, Prop } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';
import { TweetI } from '~/interfaces/tweet.interface';

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

  @Emit('toggle-like')
  toggleLike() {
    const { id, likes } = this.tweet;
    return { id, isLike: !likes.isLikedByMe };
  }
}
</script>

<template>
  <ContainerActionsMenu :actions="moreActions">
    <article class="tweet">
      <div class="tweet__left">
        <img class="user-img" :src="tweet.user.img" width="35" height="35">
      </div>
      <div class="tweet__right">
        <div class="tweet__info">
          <template>
            <span class="user-name">{{ tweet.user.name }}</span>
            <span class="user-login">{{ tweet.user.login }}</span>
            <span class="posted-date">3h</span>
          </template>
        </div>
        <div class="tweet__body">
          <template>
            {{ tweet.body }}
          </template>
        </div>
        <div class="tweet__actions">
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
  display: flex;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  position: relative;

  &:hover {
    background: $background-hover-pale;
  }

  &__left {
    flex-basis: 50px;

    .user-img {
      border-radius: 50%;
    }
  }

  &__info {
    margin-bottom: .5rem;

    > * {
      margin-right: .5rem;
    }
  }

  &__right {
    flex-direction: column;
    flex: 1;
  }

  &__info {
    display: flex;

    .user-name {
      font-weight: bold;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    padding-right: 5rem;
  }

  &__action {
    &_active {
      color: $like !important;
    }
  }
}
</style>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';
import { TweetI } from '~/interfaces/tweet.interface';

interface ActionBottomI {
  icon: string;
  title: string;
  isActive?: string;
  text?: string;
}

@Component({
  components: {
    ContainerActionsMenu,
  },
})
export default class TweetItem extends Vue {
  @Prop({ type: Object })
  tweet!: TweetI;

  @Prop({ type: Boolean, default: false })
  skeleton!: boolean;

  readonly moreActions = [
    { icon: 'mdi-account-plus', text: 'Follow this User' },
    { icon: 'mdi-flag-outline', text: 'Report this Tweet' },
  ];

  readonly footerActions: ActionBottomI[] = [
    { icon: 'mdi-message-reply', title: 'Reply' },
    { icon: 'mdi-repeat-variant', title: 'Repost' },
    { icon: 'mdi-heart-outline', title: 'Like', text: '15' },
    { icon: 'mdi-export-variant', title: 'Share' },
  ];
}
</script>

<template>
  <ContainerActionsMenu :actions="!skeleton ? moreActions : []">
    <article class="tweet" :class="{ skeleton }">
      <div class="tweet__left">
        <img v-if="!skeleton" class="user-img" :src="tweet.user.img" width="35" height="35">
        <div v-else class="user-img"></div>
      </div>
      <div class="tweet__right">
        <div class="tweet__info">
          <template v-if="!skeleton">
            <span class="user-name">{{ tweet.user.name }}</span>
            <span class="user-login">{{ tweet.user.login }}</span>
            <span class="posted-date">3h</span>
          </template>
          <template v-else>&nbsp;</template>
        </div>
        <div class="tweet__body">
          <template v-if="!skeleton">
            {{ tweet.body }}
          </template>
          <template v-else>
            <p>&nbsp</p>
            <p>&nbsp</p>
          </template>
        </div>
        <div class="tweet__actions">
          <template v-if="!skeleton">
            <v-btn
              v-for="action in footerActions"
              :key="action.icon"
              text
              icon
            >
              <template>
                <v-icon>{{ action.icon }}</v-icon>
                {{ action.text  }}
              </template>
            </v-btn>
          </template>
          <template v-else>
            <span class="skeleton-action" v-for="action in footerActions"></span>
          </template>
        </div>
      </div>
    </article>
  </ContainerActionsMenu>
</template>

<style scoped lang="scss">
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-action {
  padding: 1rem;
  border-radius: 20%;
  background: $skeleton;
  margin-top: .25rem;
}
.tweet {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  position: relative;

  &.skeleton {
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
          90deg,
          rgba(#fff, 0) 0,
          rgba(#fff, 0.2) 20%,
          rgba(#fff, 0.5) 60%,
          rgba(#fff, 0)
      );
      animation: shimmer 2s infinite;
      content: '';
    }
    .user-img {
      width: 35px;
      height: 35px;
      background: $skeleton;
    }
    .tweet__info {
      width: 300px;
      background: $skeleton;
    }
    .tweet__body {
      p {
        background: $skeleton;
        &:not(:last-child) {
          margin-bottom: 0.25rem;
        }
      }
    }
  }

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
}
</style>

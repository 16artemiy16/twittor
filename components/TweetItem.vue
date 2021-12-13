<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';

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
  @Prop({ type: Object, required: true })
  tweet!: Record<string, any>;

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
  <ContainerActionsMenu :actions="moreActions">
    <article class="tweet">
      <div class="tweet__left">
        <img class="user-img" :src="tweet.user.img" width="35" height="35">
      </div>
      <div class="tweet__right">
        <div class="tweet__info">
          <span class="user-name">{{ tweet.user.name }}</span>
          <span class="user-login">{{ tweet.user.login }}</span>
          <span class="posted-date">3h</span>
        </div>
        <div class="tweet__body">{{ tweet.body }}</div>
        <div class="tweet__actions">
          <v-btn
            v-for="action in footerActions"
            :key="action.icon"
            text
            icon
          >
            <v-icon>{{ action.icon }}</v-icon>
            {{ action.text  }}
          </v-btn>
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
}
</style>

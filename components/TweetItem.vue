<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import ContentCard from '~/components/ContentCard.vue';
import { Prop } from 'vue-property-decorator';

interface ActionI {
  icon: string;
  title: string;
  isActive?: string;
  text?: string;
}

@Component({
  components: {
    ContentCard,
  },
})
export default class TweetItem extends Vue {
  @Prop({ type: Object, required: true })
  tweet!: Record<string, any>;

  readonly actions = [
    { icon: 'mdi-account-plus', text: 'Follow this User' },
    { icon: 'mdi-flag-outline', text: 'Report this Tweet' },
  ];

  readonly footerActions: ActionI[] = [
    { icon: 'mdi-message-reply', title: 'Reply' },
    { icon: 'mdi-repeat-variant', title: 'Repost' },
    { icon: 'mdi-heart-outline', title: 'Like', text: '15' },
    { icon: 'mdi-export-variant', title: 'Share' },
  ];
}
</script>

<template>
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
</template>

<style scoped lang="scss">
.tweet {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  width: 100%;

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

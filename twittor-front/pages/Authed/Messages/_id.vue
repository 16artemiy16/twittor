<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';
import AppUserImg from '~/components/app/AppUserImg.vue';
import { MessageI } from '~/interfaces/message.interface';

@Component({
  components: {
    AppUserImg,
    ContainerActionsMenu,
  }
})
export default class Message extends Vue {
  messages: MessageI[] = [
    {
      id: 1,
      isGroup: false,
      users: [{
        id: 1,
        login: 'test',
        img: 'http://localhost:5000/filestorage/profile/12f7ba1d24bd46b3a19d187ddb1a4b6b.png',
        fullname: 'Mr. Green',
        stats: {
          tweets: 1,
          followingCount: 2,
          followersCount: 5,
        },
        isVerified: false,
        headerImg: null,
        about: 'Just the green mister',
      }],
    },
    {
      id: 2,
      isGroup: false,
      users: [{
        id: 2,
        login: 'lich',
        img: null,
        fullname: 'Lich Skeleton',
        stats: {
          tweets: 1,
          followingCount: 2,
          followersCount: 5,
        },
        isVerified: false,
        headerImg: null,
        about: 'Hello! My name is Lich!!',
      }],
    }
  ]
}
</script>

<template>
  <v-layout column class="messages-page pa-4">
    <v-layout align-center class="messages-page__actions mb-2">
      <h4>Messages</h4>
      <v-layout />
      <v-btn icon text title="New Message">
        <v-icon>mdi-email-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-text-field
      label="Search for people and groups"
      outlined
    ></v-text-field>
    <v-layout column class="mx-n4">
      <ContainerActionsMenu
        v-for="msg in messages"
        :key="msg.id"
        :actions="[{ text: 'Delete conversation', icon: 'mdi-delete-outline' }]"
      >
        <v-layout class="msg-item  py-4 px-2 pr-16">
          <AppUserImg :user="msg.users[0]" size="65" />
          <v-layout column class="ml-4">
            <v-layout>
              <strong>{{ msg.users[0].fullname }}</strong>
              <div class="ml-2">@{{ msg.users[0].login }}</div>
              <v-spacer></v-spacer>
              <div>15 min</div>
            </v-layout>
          </v-layout>
        </v-layout>
      </ContainerActionsMenu>
    </v-layout>
  </v-layout>
</template>

<style scoped lang="scss">
.msg-item {
  cursor: pointer;

  &:hover {
    background: $background-hover-pale;
  }

  &__img {
    width: 65px;
    height: 65px;
  }
}
</style>

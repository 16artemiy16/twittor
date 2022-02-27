<script lang="ts">
import Component from 'vue-class-component';
import AppModal from '~/components/app/AppModal.vue';
import { UserProfileI } from '~/interfaces/user-profile.interface';
import AppUserImg from '~/components/app/AppUserImg.vue';
import { Vue } from 'vue-property-decorator';

@Component({
  components: {
    AppModal,
    AppUserImg
  }
})
export default class MessagesAddModal extends Vue {
  users: UserProfileI[] = [
    {
      id: 1,
      login: 'test',
      img: null,
      fullname: 'Mr. Green',
      stats: {
        tweets: 1,
        followingCount: 2,
        followersCount: 5,
      },
      isVerified: false,
      headerImg: null,
      about: 'Just the green mister',
    },
    {
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
    }
  ];
  selectedUsersMap: Map<number, UserProfileI> = new Map<number, UserProfileI>();

  get selectedUsers(): UserProfileI[] {
    return [...this.selectedUsersMap.values()];
  }

  toggleUserSelection(user: UserProfileI) {
    this.selectedUsersMap.has(user.id)
      ? this.selectedUsersMap.delete(user.id)
      : this.selectedUsersMap.set(user.id, user);
    // Need to re-create the Map as Vue 2 does not support Map reactivity
    this.selectedUsersMap = new Map<number, UserProfileI>(this.selectedUsersMap);
  }

  handleNext() {

  }
}
</script>

<template>
  <AppModal
    header-text="New message"
    @close="$emit('close')"
    :actions="[{ text: 'Next', handler: () => handleNext() }]"
  >
    <v-layout
      column
      class="mx-4 mt-4 mb-2"
    >
      <v-text-field
        class="mb-n6"
        label="Search people"
        outlined
      ></v-text-field>

      <v-layout>
        <v-chip
          v-for="user in selectedUsers"
          :key="user.id"
          :title="user.fullname"
          @click:close="() => toggleUserSelection(user)"
          close
          close-icon="mdi-close-outline"
        >{{ user.login }}</v-chip>
      </v-layout>
    </v-layout>

    <v-divider />

    <v-layout
      v-for="user in users"
      :key="user.id"
      @click="() => toggleUserSelection(user)"
      class="msg-item py-4 px-2"
    >
      <AppUserImg :user="user" size="45" />
      <v-layout column class="ml-4">
        <v-layout>
          <strong>{{ user.fullname }}</strong>
          <div class="ml-2">@{{ user.login }}</div>
          <v-spacer></v-spacer>
          <v-icon v-if="selectedUsersMap.has(user.id)">mdi-check</v-icon>
        </v-layout>
      </v-layout>
    </v-layout>
  </AppModal>
</template>

<style scoped lang="scss">
.msg-item {
  cursor: pointer;

  &:hover {
    background: $background-hover-pale;
  }
}
</style>

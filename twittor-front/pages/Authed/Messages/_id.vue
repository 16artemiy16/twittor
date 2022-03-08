<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';
import AppUserImg from '~/components/app/AppUserImg.vue';
import MessagesActionAddNew from '~/components/Messages/messages-action-add-new.vue';
import { DialogI } from '~/interfaces/dialog.interface';
import { computed as msgComputed, actions as msgActions } from '~/store/messages/sandbox';

@Component({
  computed: {
    dialogs: msgComputed.dialogs,
    isLoadingDialogs: msgComputed.isLoadingDialogs,
  },
  methods: {
    fetchDialogs: msgActions.fetchDialogs,
  },
  components: {
    AppUserImg,
    ContainerActionsMenu,
    MessagesActionAddNew,
  }
} as any)
export default class Message extends Vue {
  dialogs!: DialogI[];
  isLoadingDialogs!: boolean;
  fetchDialogs!: Function;

  created() {
    this.fetchDialogs();
  }
}
</script>

<template>
  <v-layout column class="messages-page pa-4">
    <v-layout align-center class="messages-page__actions mb-2">
      <h4>Messages</h4>
      <v-layout />
      <MessagesActionAddNew />
    </v-layout>
    <v-text-field
      label="Search for people and groups"
      outlined
    ></v-text-field>
    <v-layout column class="mx-n4">
      <v-progress-linear
        v-if="isLoadingDialogs"
        indeterminate
        color="cyan"
      ></v-progress-linear>
      <ContainerActionsMenu
        v-else
        v-for="msg in dialogs"
        :key="msg.id"
        :actions="[{ text: 'Delete conversation', icon: 'mdi-delete-outline' }]"
      >
        <v-layout class="msg-item py-4 px-2 pr-16">
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
}
</style>

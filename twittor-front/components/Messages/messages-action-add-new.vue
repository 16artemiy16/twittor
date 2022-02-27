<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import AppUserImg from '~/components/app/AppUserImg.vue';

@Component({
  components: {
    AppUserImg,
    MessagesAddModal: () => import('~/components/Messages/MessagesAddModal.vue' /* webpackChunkName: "MessagesAddModal" */),
  }
})
export default class MessagesActionAddNew extends Vue {
  dialog = false;
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        text
        title="New Message"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-email-plus</v-icon>
      </v-btn>
    </template>

    <MessagesAddModal v-if="dialog" @close="dialog = false" />
  </v-dialog>
</template>

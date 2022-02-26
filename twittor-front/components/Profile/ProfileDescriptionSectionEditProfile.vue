<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mutations as profileMutations, computed as profileComputed } from '~/store/profile/sandbox';

@Component({
  components: {
    ProfileDescriptionSectionEditProfileModal: () => (
      import('~/components/Profile/ProfileDescriptionSectionEditProfileModal.vue' /* webpackChunkName: "profileEditModal" */)
    )
  },
  computed: {
    isEditOpened: profileComputed.isProfileEditModalOpened
  },
  methods: {
    toggleProfileEdit: profileMutations.toggleProfileEdit,
  }
} as any)
export default class ProfileDescriptionSectionEditProfile extends Vue {
  toggleProfileEdit!: Function;
  isEditOpened!: boolean;
}
</script>

<template>
  <v-dialog persistent max-width="600" :value="isEditOpened">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded v-bind="on" v-on="on" @click="() => toggleProfileEdit(true)">Edit profile</v-btn>
    </template>
    <ProfileDescriptionSectionEditProfileModal v-if="isEditOpened" />
  </v-dialog>
</template>

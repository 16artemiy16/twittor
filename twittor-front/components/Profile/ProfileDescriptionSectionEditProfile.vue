<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { computed as profileComputed } from '~/store/profile/sandbox';
import { actions as authActions, computed as authComputed } from '~/store/auth/sandbox';
import { UserProfileI } from '~/interfaces/user-profile.interface';
import AppModal from '~/components/app/AppModal.vue';

interface ProfileModelI {
  fullname: string;
  img: string | null;
}

@Component({
  components: {
    AppUserImgUploader: () => import('~/components/app/AppUserImgUploader.vue' /* webpackChunkName: "AppUserImgUploader" */),
    AppModal,
  },
  computed: {
    user: profileComputed.profileInfo,
    isProfileUpdating: authComputed.isProfileUpdating,
  },
  methods: {
    updateProfile: authActions.updateProfile,
  },
} as any)
export default class ProfileDescriptionSectionEditProfile extends Vue {
  user!: UserProfileI;
  isProfileUpdating!: boolean;
  updateProfile!: Function;

  model: ProfileModelI = {
    fullname: '',
    img: null,
  }
  isOpened: boolean = false;

  created() {
    const { fullname, img } = this.user;
    this.model = { fullname, img, };
  }

  async handleSave() {
    await this.updateProfile(this.model);
    // Reload the page after the profile was updated
    // TODO: perform live update
    this.$router.go(0)
  }

  close() {
    this.isOpened = false;
  }
}
</script>

<template>
  <v-dialog persistent max-width="600" v-model="isOpened">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded v-bind="on" v-on="on">Edit profile</v-btn>
    </template>
    <AppModal
      v-if="isOpened"
      :actions="[{ text: 'Save', handler: () => handleSave() }]"
      :isLoading="isProfileUpdating"
    >
      <form class="w-100 form">
        <div class="w-100 form__header-img"></div>
        <AppUserImgUploader
          v-model="model.img"
          class="form__profile-img ml-6"
        />
        <v-text-field
          outlined
          :disabled="isProfileUpdating"
          class="mt-4"
          label="Full name" v-model="model.fullname"
        />
      </form>
    </AppModal>
  </v-dialog>
</template>

<style scoped lang="scss">
.form {
  &__header-img {
    height: 170px;
    background: lightgrey;
  }
  &__profile-img {
    margin-top: -60px;
  }
}
</style>

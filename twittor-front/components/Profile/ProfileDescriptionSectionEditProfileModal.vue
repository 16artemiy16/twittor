<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

import AppUserImgUploader from '~/components/app/AppUserImgUploader.vue';
import AppModal from '~/components/app/AppModal.vue';
import { computed as profileComputed, mutations as profileMutations } from '~/store/profile/sandbox';
import { actions as authActions, computed as authComputed } from '~/store/auth/sandbox';
import { UserProfileI } from '~/interfaces/user-profile.interface';

interface ProfileModelI {
  fullname: string;
  img: string | null;
}

@Component({
  components: {
    AppModal,
    AppUserImgUploader,
  },
  computed: {
    user: profileComputed.profileInfo,
    isProfileUpdating: authComputed.isProfileUpdating,
  },
  methods: {
    updateProfile: authActions.updateProfile,
    toggleProfileEdit: profileMutations.toggleProfileEdit,
  },
})
export default class ProfileDescriptionSectionEditProfileModal extends Vue {
  user!: UserProfileI;
  toggleProfileEdit!: Function;
  isProfileUpdating!: boolean;
  updateProfile!: Function;

  model: ProfileModelI = {
    fullname: '',
    img: null,
  }

  created() {
    const { fullname, img } = this.user;
    this.model = { fullname, img, };
  }

  async save() {
    await this.updateProfile(this.model);
    // TODO: it's page reload for now, make live update in future
    this.$router.go(0)
  }

  get isFormInvalid(): boolean {
    return !this.model.fullname.trim().length;
  }
}
</script>

<template>
  <AppModal
    :actions="[{ text: 'Save', handler: () => save(), disabled: isFormInvalid }]"
    :isLoading="isProfileUpdating"
    @close="() => toggleProfileEdit(false)"
  >
    <form class="w-100 form">
      <div class="w-100 form__header-img"></div>
      <AppUserImgUploader
        v-model="model.img"
        class="form__profile-img ml-6"
      />
      <v-text-field
        outlined
        :disabled="isLoading"
        class="mt-4"
        label="Full name" v-model="model.fullname"
      />
    </form>
  </AppModal>
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

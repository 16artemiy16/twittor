<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { computed as profileComputed } from '~/store/profile/sandbox';
import { actions as authActions, computed as authComputed } from '~/store/auth/sandbox';
import { UserProfileI } from '~/interfaces/user-profile.interface';

interface ProfileModelI {
  fullname: string;
  img: string | null;
}

@Component({
  computed: {
    user: profileComputed.profileInfo,
    isProfileUpdating: authComputed.isProfileUpdating,
  },
  methods: {
    updateProfile: authActions.updateProfile,
  },
})
export default class ProfileDescriptionSectionEditProfile extends Vue {
  user!: UserProfileI;
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
    // TODO: img will be in the future
    const { fullname } = this.model;
    if (this.user.fullname === fullname) {
      return;
    }
    await this.updateProfile({ fullname });
    // Reload the page after the profile was updated
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
    <v-card light class="modal" v-if="isOpened">
      <v-layout justify-space-between class="modal__header pa-2">
        <v-btn icon text @click="close(false)" :disabled="isProfileUpdating">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn @click="handleSave()" :disabled="isProfileUpdating">Save</v-btn>
      </v-layout>
      <template>

        <v-progress-linear
          v-if="isProfileUpdating"
          indeterminate
          color="cyan"
        ></v-progress-linear>
        <!--
          When progressbar appears from nowhere the layout jumps,
          this spacer replaces the progressbar when it's absent,
          making its appearance smooth
        -->
        <div class="mb-1" v-else></div>
      </template>
      <main class="modal__main">
        <form class="w-100 form">
          <div class="w-100 form__header-img"></div>
          <img class="form__profile-img rounded-circle ml-6" :src="model.img" width="120" height="120" alt="User img" />
          <v-text-field
            outlined
            :disabled="isProfileUpdating"
            class="mt-4"
            label="Full name" v-model="model.fullname"
          />
        </form>
      </main>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.modal {
  &__header {
    border-bottom: 1px $grey solid;
  }

  &__main {
    padding: 1rem;
  }
}
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

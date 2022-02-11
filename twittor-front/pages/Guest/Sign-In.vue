<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { actions as authActions } from '~/store/auth/sandbox';

@Component({
  middleware: ['guest'],
  methods: {
    logIn: authActions.logIn,
  },
} as any)
export default class SignIn extends Vue {
  logIn!: Function;

  login: string = '';
  password: string = '';
  errorMsg: string = '';

  async handleLogIn() {
    const { login, password } = this;
    const { success, msg } = await this.logIn({ login, password });
    if (success) {
      return this.$router.push({ path: '/authed/home' });
    }
    this.errorMsg = msg || '';
  }
}
</script>

<template>
  <v-app>
    <div class="page d-flex align-center justify-center flex-column">
      <form class="sign-in pa-4">
        <h2 class="text-center mb-4">Log In Twittor</h2>
        <v-text-field outlined label="Login" v-model="login" />
        <v-text-field outlined label="Password" type="password" v-model="password" />
        <div class="sign-in__error mb-4 text-center">
          {{ errorMsg }}
        </div>
        <v-btn class="w-100 mb-2" @click="handleLogIn()">Login</v-btn>
        <div class="text-center mb-2">OR</div>
        <v-btn class="w-100" @click="() => $router.push({ path: '/guest/sign-up/' })">Sign Up</v-btn>
      </form>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.sign-in {
  width: 400px;
  border: 1px $grey solid;

  &__error {
    color: $like;
  }
}
.page {
  height: 100vh;
  width: 100vw;
}
</style>

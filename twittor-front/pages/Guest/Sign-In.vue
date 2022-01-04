<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class SignIn extends Vue {
  logIn() {
    this.$router.push({ path: '/authed/home' })
  }
}
</script>

<template>
  <v-app>
    <div class="page d-flex align-center justify-center">
      <form class="sign-in pa-4">
        <h2 class="text-center mb-4">Log In Twittor</h2>
        <v-text-field outlined label="Login" />
        <v-text-field outlined label="Password" type="password" />
        <v-btn class="w-100 mb-2" @click="logIn()">Login</v-btn>
        <div class="text-center mb-2">OR</div>
        <v-btn class="w-100">Sign Up</v-btn>
      </form>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.sign-in {
  width: 400px;
  border: 1px $grey solid;
}
.page {
  height: 100vh;
  width: 100vw;
}
</style>

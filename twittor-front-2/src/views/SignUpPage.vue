<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      login: '',
      pass: '',
      passAgain: '',
      fullname: '',
    };
  }
});
</script>

<template>
  <div class="page">
    <h1 class="title">Sign Up</h1>
    <form class="form">
      <ui-input v-model.lazy="login" class="form__login" placeholder="Login"  />
      <ui-input v-model.lazy="fullname" class="form__fullname" placeholder="Full Name"  />
      <ui-input v-model="pass" class="form__pass" placeholder="Password" type="password"  />
      <ui-input v-model="passAgain" class="form__pass-again" placeholder="Password again" type="password" />
      <ui-btn class="form__submit">Sign Up</ui-btn>
      <div class="or">OR</div>
      <div>
        A am already have an account.
        <router-link to="sign-in">Sign In</router-link>
      </div>
    </form>
  </div>
</template>

<style>
.page {
  flex: 1;
}
.page, .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

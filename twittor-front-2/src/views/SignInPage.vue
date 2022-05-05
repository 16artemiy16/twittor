<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';

export default defineComponent({
  data() {
    return {
      login: '',
      password: '',
    };
  },
  setup() {
    const { signIn } = useAuthStore();

    return {
      signIn,
    };
  }
})

</script>

<template>
  <div class="page">
    <h1 class="title">Sign In</h1>
    <form class="form" @submit.prevent="signIn(login, password)">
      <input v-model.lazy="login" type="text" placeholder="Login" class="form__login" />
      <input v-model.lazy="password" type="password" placeholder="Password" class="form__pass" />
      <button class="form__submit">Sign In</button>
      <div class="or">OR</div>
      <div class="signup-invite">
        <router-link to="sign-up" class="signup-invite__link">Sign Up</router-link>
        if you have no account.
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

.or {
  text-align: center;
}
</style>

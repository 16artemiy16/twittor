<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const login = ref('');
const password = ref('');

const authStore = useAuthStore();

const signIn = () => {
  authStore.signIn(login.value, password.value);
};

</script>

<template>
  <div class="page">
    <h1 class="title">Sign In</h1>
    <form class="form" @submit.prevent="signIn">
      <input v-model.lazy="login" type="text" placeholder="Login" class="form__login" />
      <input v-model.lazy="password" type="password" placeholder="Password" class="form__pass" />
      <button class="form__submit">Sign In</button>
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

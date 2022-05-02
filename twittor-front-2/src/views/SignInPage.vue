<script setup lang="ts">
import useAuthApi from '@/composables/api/auth.api';

const signIn = () => {
  useAuthApi().signIn('user1', 'user1');
}
</script>

<template>
  <div class="page">
    <h1 class="title">Sign In</h1>
    <form class="form" @submit.prevent="signIn">
      <input type="text" placeholder="Login" class="form__login" />
      <input type="password" placeholder="Password" class="form__pass" />
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

<script setup lang="ts">

</script>

<template>
  <div class="page">
    <h1 class="title">Sign In</h1>
    <form class="form">
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

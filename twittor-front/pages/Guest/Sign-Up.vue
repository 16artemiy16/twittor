<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

interface SignUpFormI {
  login: string;
  name: string;
  password: string;
  passwordAgain: string;
  isPolicy: boolean;
}

@Component
export default class SignUp extends Vue {
  form: SignUpFormI = {
    login: '',
    name: '',
    password: '',
    passwordAgain: '',
    isPolicy: false,
  }

  get isFormValid() {
    const { login, name, password, passwordAgain, isPolicy } = this.form;
    return login.length >= 3 && name.length >= 3 && isPolicy && password === passwordAgain;
  }

  togglePolicy() {
    this.form.isPolicy = !this.form.isPolicy;
  }

  async signUp() {
    const { login, password, name } = this.form;
    try {
      await this.$authService.signUp({ login, password, name });
      this.$router.push({ path: '/guest/sign-in' });
    } catch (e) {
    }
  }
}
</script>

<template>
  <v-app>
    <div class="page d-flex justify-center align-center">
      <div class="left">

      </div>
      <v-divider vertical />
      <div class="right">
        <v-form class="form" ref="form">
          <h2 class="text-center mb-4">Sign Up</h2>
          <v-text-field outlined label="Login" v-model="form.login"  />
          <v-text-field outlined label="Name" v-model="form.name" />
          <v-text-field outlined label="Password" type="password" v-model="form.password" />
          <v-text-field outlined label="Password again" type="password" v-model="form.passwordAgain" />
          <div class="d-flex align-center mt-n6">
            <v-checkbox v-model="form.isPolicy" />
            <span class="policy" @click="togglePolicy">I am agree with the policy</span>
          </div>
          <v-btn @click="signUp" :disabled="!isFormValid">Sign Up</v-btn>
          <div class="mt-4">
            or <router-link to="/guest/sign-in">Sign In</router-link> if you already have an account
          </div>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.page {
  height: 100vh;
  width: 100vw;

  a {
    color: #1976d2 !important;
  }

  .left {
    flex: 1;
  }

  .right {
    flex-basis: 60%;
    display: flex;
    justify-content: center;
  }

  .form {
    width: 500px;

    .policy {
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>

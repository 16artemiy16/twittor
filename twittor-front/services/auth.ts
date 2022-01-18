import Vue from 'vue';
import { Inject } from '@nuxt/types/app';
import jwtDecode from 'jwt-decode';
import { UserJWTI } from '~/interfaces/user-jwt.interface';

const COOKIE_KEY_TOKEN = 'token';

interface LogInI {
  success: boolean;
  msg?: string;
}

interface SignUpPayloadI {
  login: string;
  password: string;
  fullname: string;
}

export interface AuthServiceI {
  logIn: (login: string, password: string) => Promise<LogInI>,
  logOut: () => void;
  token: () => string;
  user: () => UserJWTI | null;
  signUp: (payload: SignUpPayloadI) => Promise<any>;
}

export default ({ $axios, $cookies }: Vue, inject: Inject) => {
  const authService: AuthServiceI = {
    logIn: async (login, password) => {
      try {
        const { data } = await $axios.post('/sign-in', { login, password });
        $cookies.set(COOKIE_KEY_TOKEN, data.token);
        return { success: true }
      } catch (err) {
        return { success: false, msg: err.response.data.message };
      }
    },
    logOut: () => {
      $cookies.remove(COOKIE_KEY_TOKEN);
    },
    token: () => $cookies.get(COOKIE_KEY_TOKEN),
    user: () => {
      const token = $cookies.get(COOKIE_KEY_TOKEN);
      return token ? jwtDecode(token) : null;
    },
    signUp: async ({ login, password, fullname }) => {
      await $axios.post('/sign-up', { login, password, fullname });
    },
  };

  inject('authService', authService);
}

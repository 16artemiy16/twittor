import Vue from 'vue';
import { Inject } from '@nuxt/types/app';

const LS_KEY_TOKEN = 'token';

interface LogInI {
  success: boolean;
  msg?: string;
}

export interface AuthServiceI {
  logIn: (login: string, password: string) => Promise<LogInI>,
  logOut: () => void;
}

export default ({ $axios }: Vue, inject: Inject) => {
  const authService: AuthServiceI = {
    logIn: async (login: string, password: string): Promise<LogInI> => {
      try {
        const { data } = await $axios.post('/sign-in', { login, password });
        localStorage.setItem(LS_KEY_TOKEN, data.token);
        return { success: true }
      } catch (err) {
        return { success: false, msg: err.response.data.message };
      }
    },
    logOut: () => {
      localStorage.removeItem(LS_KEY_TOKEN);
    }
  };

  inject('authService', authService);
}

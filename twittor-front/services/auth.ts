import Vue from 'vue';
import { Inject } from '@nuxt/types/app';
import jwtDecode from 'jwt-decode';
import { UserJWTI } from '~/interfaces/user-jwt.interface';
import { UpdateUserDto } from '~/dtos/update-user.dto';

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
  logIn: (login: string, password: string) => Promise<string>,
  logOut: () => void;
  token: () => string;
  user: () => UserJWTI | null;
  signUp: (payload: SignUpPayloadI) => Promise<any>;
  updateUser: (dto: UpdateUserDto) => Promise<any>;
}

export default ({ $axios, $cookies }: Vue, inject: Inject) => {
  const authService: AuthServiceI = {
    logIn: async (login, password) => {
      const { data } = await $axios.post('/sign-in', {login, password});
      return data.token;
    },
    logOut: () => {
      $cookies.remove(COOKIE_KEY_TOKEN);
    },
    token: () => $cookies.get(COOKIE_KEY_TOKEN),
    user: () => {
      const token = $cookies.get(COOKIE_KEY_TOKEN);
      try {
        return token ? jwtDecode(token) : null;
      } catch (e) {
        $cookies.remove(COOKIE_KEY_TOKEN);
        return null;
      }
    },
    signUp: async ({ login, password, fullname }) => {
      await $axios.post('/sign-up', { login, password, fullname });
    },
    updateUser: async (dto) => {
      const formData = new FormData();
      dto.img && formData.append('profileImg', dto.img)
      dto.fullname && formData.append('fullname', dto.fullname);
      const { data } = await $axios.put('/profile/', formData);
      return data;
    }
  };

  inject('authService', authService);
}

import { AuthServiceI } from '~/services/auth';

declare module 'vue/types/vue' {
  interface Vue {
    $authService: AuthServiceI;
  }
}
